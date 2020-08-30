import React from "react";

import s from "./TopicForm.module.scss";

export const TopicForm: React.FC = () => {
  const handleChange = (e: any) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <div className={s.topicTitle}>
        <input type="text" name="topicTitle" placeholder="   " />
        <label className={s.labelInside} htmlFor="topicTitle">
          Topic title
        </label>
      </div>
      <div className={s.topicText}>
        <textarea name="topicText" placeholder="   " />
        <label className={s.labelInside} htmlFor="topicText">
          Topic text
        </label>
      </div>
      <div className={s.topicLayout}>
        <label htmlFor="topicLayout">Choose layout</label>
        <select name="topicLayout" onChange={handleChange}>
          <option value="color">Color</option>
          <option value="itemList">Item list</option>
          <option value="rail">Rail</option>
          <option value="stretch">Stretch</option>
          <option value="videoBox">Video box</option>
          <option value="window">Window</option>
        </select>
      </div>
    </div>
  );
};
