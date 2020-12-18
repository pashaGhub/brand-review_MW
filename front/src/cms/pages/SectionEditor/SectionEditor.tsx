import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { EditContext, ITopic } from "../../../context/EditContext";
import { useDebounce } from "../../../hooks/debounce.hook";
// import {getSections} from '../../../services/sectionServices'

import { TopicForm } from "./TopicForm/TopicForm";
import { Upload } from "../../components/Upload/Upload";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import { Button } from "../../../components/Button/Button";

import s from "./SectionEditor.module.scss";

export const SectionEditor: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const { setSectionTitle, topics, addTopic, uploadOpen } = useContext(
    EditContext
  );
  const [title, setTitle] = useState<string>();
  const dTitle = useDebounce(title, 1000);

  const location = useLocation();
  useEffect(() => {
    handleLocation(location);
    setSectionTitle(dTitle);
  }, [handleLocation, location, dTitle]);

  return (
    <>
      {uploadOpen && <Upload />}
      <div className={s.container}>
        <Dashboard />
        <div className={s.panel}>
          <div className={s.form}>
            <Button text="Submit" clickHandler={() => {}} success />
            <div className={s.sectionTitle}>
              <input
                type="text"
                name="sectionTitle"
                placeholder="   "
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className={s.labelInside} htmlFor="sectionTitle">
                Section title
              </label>
            </div>
            {topics &&
              topics
                .sort((a: ITopic, b: ITopic) => a.order - b.order)
                .map((item: ITopic) => <TopicForm key={item.id} item={item} />)}
            <Button text="Add Topic" clickHandler={() => addTopic()} success />
          </div>
        </div>
      </div>
    </>
  );
};
