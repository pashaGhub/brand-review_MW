import React, { createContext, useState } from "react";
import { createID } from "../utils/utils";

export const EditContext = createContext<any>(Boolean);
export interface IImg {
  _id: number;
  image: string;
  alt: string;
  subtitle?: string;
  imgText: string | Array<string>;
}

export interface ITopic {
  _id: number;
  order: number;
  layout: string;
  title: string;
  text: string;
  topicVideo?: string;
  topicImgs?: Array<IImg>;
}

interface IFormData {
  title: string;
  topics: Array<ITopic>;
}

export function EditContextProvider(props: any): JSX.Element {
  const [formData, setFormData] = useState<IFormData>();
  const [sectionTitle, setSectionTitle] = useState<string>("");
  const [topics, setTopics] = useState<Array<ITopic>>([]);
  const [uploadOpen, setUploadOpen] = useState<boolean>(false);
  const [uploadVideo, setUploadVideo] = useState<boolean>(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [edit, setEdit] = useState<boolean>(false);

  const addTopic = () => {
    setTopics((oldList: any) => {
      let newList = JSON.parse(JSON.stringify(oldList));
      newList.push({
        _id: createID(),
        layout: "",
        title: "",
        text: "",
        topicImgs: [],
        topicVideo: "",
      });
      return newList;
    });
  };

  return (
    <EditContext.Provider
      value={{
        uploadVideo,
        setUploadVideo,
        sectionTitle,
        setSectionTitle,
        topics,
        setTopics,
        setFormData,
        addTopic,
        uploadOpen,
        setUploadOpen,
        setSelectedImg,
        selectedImg,
        setSelectedVideo,
        selectedVideo,
        edit,
        setEdit,
      }}
    >
      {props.children}
    </EditContext.Provider>
  );
}
