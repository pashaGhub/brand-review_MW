import React, { createContext, useState } from "react";
import { createID } from "../services/utils";

export const EditContext = createContext<any>(Boolean);
export interface IImgsForm {
  id: number;
  image: string;
  alt: string;
  subtitle?: string;
  imgText: string | [string];
}

export interface ITopicForm {
  id: number;
  layout: string;
  title: string;
  text: string;
  topicVideo?: string;
  topicImgs?: Array<IImgsForm>;
}

interface IFormData {
  title: string;
  topics: Array<ITopicForm>;
}

export function EditContextProvider(props: any): JSX.Element {
  const [formData, setFormData] = useState<IFormData>();
  const [sectionTitle, setSectionTitle] = useState<string>();
  const [topics, setTopics] = useState<Array<ITopicForm>>([]);
  const [topicImg, setTopicImgs] = useState<Array<IImgsForm>>();

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

  // console.log(sectionTitle);
  // console.log(topics);
  // console.log(topicImg);

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
