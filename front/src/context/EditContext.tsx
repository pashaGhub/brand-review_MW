import React, { createContext, useState } from "react";
import { createID } from "../utils/utils";

export const EditContext = createContext<any>(Boolean);
export interface IImg {
  id: number;
  image: string;
  alt: string;
  subtitle?: string;
  imgText: string | Array<string>;
}

export interface ITopic {
  id: number;
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
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const addTopic = () => {
    setTopics((oldList: any) => {
      let newList = JSON.parse(JSON.stringify(oldList));
      newList.push({
        id: createID(),
        layout: "",
        title: "",
        text: "",
        topicImgs: [],
      });
      return newList;
    });
  };
  console.log(topics);

  return (
    <EditContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </EditContext.Provider>
  );
}
