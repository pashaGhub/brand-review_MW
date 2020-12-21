import React, { useState, useContext, useEffect } from "react";
import { EditContext, ITopic } from "../../../../context/EditContext";
import { Button } from "../../../../components/Button/Button";

import s from "./VideoForm.module.scss";

interface IVideoForm {
  item: ITopic;
}

export const VideoForm: React.FC<IVideoForm> = ({ item }) => {
  const {
    topics,
    setTopics,
    selectedVideo,
    setSelectedVideo,
    setUploadOpen,
    setUploadVideo,
  } = useContext(EditContext);
  const [video, setVideo] = useState<string | null>(item.topicVideo || null);
  const [selecting, setSelecting] = useState<boolean>(false);

  const handleUploadVideo = () => {
    setUploadVideo(true);
    setUploadOpen(true);
    setSelecting(true);
  };

  useEffect(() => {
    if (selecting && selectedVideo) {
      setVideo(selectedVideo);
      setSelecting(false);
      setSelectedVideo(null);
    }
  }, [selecting, selectedVideo]);

  useEffect(() => {
    let newItem = item;
    newItem = { ...item, topicVideo: video ? video : "" };
    let newTopics = topics.filter((topic: ITopic) => item._id !== topic._id);
    newTopics.splice(
      topics.findIndex((topic: ITopic) => item._id === topic._id),
      0,
      newItem
    );
    setTopics(newTopics);
  }, [video]);

  return (
    <>
      {video ? (
        <>
          <Button text="Choose video" clickHandler={handleUploadVideo} />
          <div className={s.video}>
            <iframe title="video" src={video} allowFullScreen></iframe>
          </div>
        </>
      ) : (
        <div
          className={s.addVideo}
          tabIndex={0}
          onClick={() => handleUploadVideo()}
        >
          <span>
            Choose a video <div className={s.plus}>+</div>
          </span>
        </div>
      )}
    </>
  );
};
