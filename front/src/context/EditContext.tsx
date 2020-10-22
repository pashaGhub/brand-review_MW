import React, { createContext, useState } from "react";
import { createID } from "../services/utils";

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
  const [topicImg, setTopicImgs] = useState<Array<IImg>>();

  const addTopic = () => {
    setTopics((oldList: any) => {
      let newList = JSON.parse(JSON.stringify(oldList));
      newList.push({
        id: createID(),
        order: new Date().getTime(),
        layout: "",
        title: "",
        text: "",
        topicImgs: [],
      });
      return newList;
    });
  };

  return (
    <EditContext.Provider
      value={{
        sectionTitle,
        setSectionTitle,
        topics,
        setTopics,
        setTopicImgs,
        setFormData,
        addTopic,
      }}
    >
      {props.children}
    </EditContext.Provider>
  );
}
