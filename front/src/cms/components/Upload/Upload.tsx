import React, { useState, useContext, useEffect } from "react";
import { Spin } from "antd";
import { AuthContext, EditContext } from "../../../context";
import {
  uploadImgs,
  getUploadImgs,
  uploadSingleVideo,
  getUploadVideos,
  deleteFile,
} from "../../../services/uploadServices";
import { useMessage } from "../../../hooks/message.hook";

import { Button } from "../../../components/Button/Button";

import s from "./Upload.module.scss";
import Item from "antd/lib/list/Item";

interface IUploadItem {
  _id: string;
  path: string;
  owner: string;
}

const backUrl = "http://localhost:5000/";

export const Upload: React.FC = () => {
  const {
    setUploadOpen,
    setSelectedImg,
    setSelectedVideo,
    setUploadVideo,
    uploadVideo,
  } = useContext(EditContext);
  const { token } = useContext(AuthContext);
  const [selected, setSelected] = useState<IUploadItem | null>(null);
  const [refreshList, setRefreshList] = useState<boolean>(true);
  const [fileToDisplay, setFileToDisplay] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const message = useMessage();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = uploadVideo
        ? await getUploadVideos(token)
        : await getUploadImgs(token);
      if (data.length || data.length === 0) {
        const updatedPath = data.map((item: IUploadItem) => {
          return { ...item, path: `${backUrl}${item.path}` };
        });
        setFileToDisplay(updatedPath);
        setRefreshList(false);
        setLoading(false);
      } else {
        message(data);
        setRefreshList(false);
        setLoading(false);
      }
    };

    if (refreshList) {
      fetchData();
    }
  }, [refreshList]);

  const selectUpload = () => {
    if (selected && !uploadVideo) {
      setSelectedImg(selected.path);
    }
    if (selected && uploadVideo) {
      setSelectedVideo(selected.path);
    }
    setUploadOpen(false);
    setUploadVideo(false);
  };

  const closeUpload = () => {
    setSelected(null);
    setUploadOpen(false);
    setUploadVideo(false);
  };

  const handleUpload = async (e: any) => {
    if (e?.target?.files && e.target.files.length !== 0) {
      const response = uploadVideo
        ? await uploadSingleVideo(e.target.files, token)
        : await uploadImgs(e.target.files, token);

      if (response.ok) {
        setRefreshList(true);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const response = await deleteFile(id, token);
    if (response.ok) {
      setRefreshList(true);
      setSelected(null);
    }
    await message(response);
  };

  const UploadType = () => {
    if (fileToDisplay.length > 0 && uploadVideo) {
      return (
        <>
          {fileToDisplay.map((vid: IUploadItem) => (
            <div
              key={vid._id}
              className={s.video}
              onClick={() => setSelected(vid)}
            >
              <video width="320" height="240" key={vid._id} controls>
                <source src={vid.path} type="video/mp4" />
              </video>
            </div>
          ))}
        </>
      );
    } else if (fileToDisplay.length > 0 && !uploadVideo) {
      return (
        <>
          {fileToDisplay.map((img: IUploadItem) => (
            <div
              key={img._id}
              className={s.singleImage}
              onClick={() => setSelected(img)}
            >
              <img
                className={`${
                  selected && selected._id === img._id ? s.selected : ""
                }`}
                src={img.path}
                alt=""
              />
            </div>
          ))}
        </>
      );
    } else {
      return <div>There is no uploaded files...</div>;
    }
  };

  return (
    <div className={s.container}>
      <div className={s.uploadBox}>
        <div className={s.items}>
          {loading ? (
            <Spin spinning={loading} tip="loading..." />
          ) : (
            <UploadType />
          )}
        </div>
        <div className={s.dashboard}>
          <div className={s.buttons}>
            <label htmlFor="myfile" className={s.uploadBtn}>
              Upload
              {uploadVideo ? (
                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  onChange={(e) => handleUpload(e)}
                />
              ) : (
                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  multiple
                  onChange={(e) => handleUpload(e)}
                />
              )}
            </label>
            <Button text="Close" clickHandler={closeUpload} danger />
          </div>
          <div className={s.info}>
            {selected && (
              <>
                <Button
                  text="Delete"
                  clickHandler={() => handleDelete(selected._id)}
                  danger
                />
                <div className={s.fileDetails}>
                  <p>File path:</p> <p>{selected.path.split("/")}</p>
                </div>
              </>
            )}
            <Button
              text="Select"
              clickHandler={selectUpload}
              className={s.selectBtn}
              success
            />
          </div>
        </div>
      </div>
    </div>
  );
};
