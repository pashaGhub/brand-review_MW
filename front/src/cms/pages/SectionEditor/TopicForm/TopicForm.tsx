import React, { useState, useEffect, useContext } from "react";
import { EditContext, ITopicForm } from "../../../../context/EditContext";
import { ImgsForm } from "../ImgsForm/ImgsForm";

import { useDebounce } from "../../../../hooks/debounce.hook";
import { createID } from "../../../../services/utils";

import { Button } from "../../../../components/Button/Button";

import s from "./TopicForm.module.scss";

interface ITopic {
  item: ITopicForm;
}

export const TopicForm: React.FC<ITopic> = ({ item }) => {
  const { topics, setTopics } = useContext(EditContext);
  const [layout, setLayout] = useState<string>("window");
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  useEffect(() => {
    setText(item.text);
    setTitle(item.title);
  }, [item.text, item.title]);

  const addImage = () => {
    let newItem = item;
    newItem.topicImgs?.push({
      id: createID(),
      image: "",
      alt: "",
      imgText: "",
    });

    let newTopics = topics.filter((topic: ITopicForm) => item.id !== topic.id);
    newTopics.push(newItem);
    setTopics(newTopics);
  };

  const deleteImage = () => {
    const result = window.confirm(
      "Topic will be deleted IRREVERSIBLY! Do you want to continue?"
    );
    if (result) {
      const newTopics = topics.filter(
        (topic: ITopicForm) => item.id !== topic.id
      );

      setTopics(newTopics);
    }
  };

  const dTitle = useDebounce(title, 1000);
  const dText = useDebounce(text, 1000);

  useEffect(() => {
    let newItem = item;
    newItem = { ...item, layout, title: dTitle, text: dText };
    console.log(topics);

    let newTopics = topics.filter((topic: ITopicForm) => item.id !== topic.id);
    newTopics.push(newItem);
    setTopics(newTopics);
  }, [layout, dTitle, dText]);

  return (
    <div className={s.container}>
      <div className={s.topicTitle}>
        <input
          type="text"
          name="topicTitle"
          placeholder="   "
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className={s.labelInside} htmlFor="topicTitle">
          Topic title
        </label>
      </div>
      <div className={s.topicText}>
        <textarea
          name="topicText"
          placeholder="   "
          value={text}
          required
          onChange={(e) => setText(e.target.value)}
        />
        <label className={s.labelInside} htmlFor="topicText">
          Topic text
        </label>
      </div>
      <div className={s.topicLayout}>
        <label htmlFor="topicLayout">Choose layout</label>
        <select
          name="topicLayout"
          value={item.layout}
          onChange={(e) => setLayout(e.target.value)}
        >
          <option value="window">Window</option>
          <option value="color">Color</option>
          <option value="itemList">Item list</option>
          <option value="rail">Rail</option>
          <option value="stretch">Stretch</option>
          <option value="videoBox">Video box</option>
        </select>
      </div>
      {item &&
        item.topicImgs &&
        item.topicImgs.map((item: any, ind: number) => (
          <ImgsForm key={ind} layout={layout} />
        ))}
      <div className={s.buttons}>
        <Button text="Add image" clickHandler={addImage} success />
        <Button text="Delete Topic" clickHandler={deleteImage} danger />
      </div>
    </div>
  );
};
