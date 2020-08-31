import React, { useState, useCallback } from "react";

import s from "./TopicForm.module.scss";

export const TopicForm: React.FC = () => {
  const [layout, setLayout] = useState<string>("window");
  const handleChange = useCallback((e: any) => {
    const value = e.target.value;
    setLayout(value);
  }, []);
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
          <option value="window">Window</option>
          <option value="color">Color</option>
          <option value="itemList">Item list</option>
          <option value="rail">Rail</option>
          <option value="stretch">Stretch</option>
          <option value="videoBox">Video box</option>
        </select>
      </div>
    </div>
  );
};
