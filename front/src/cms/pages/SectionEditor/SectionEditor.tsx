import React, { useContext, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { AppContext, AuthContext, EditContext } from "../../../context";
import { ITopic } from "../../../context/EditContext";
import { useMessage } from "../../../hooks/message.hook";
import { useDebounce } from "../../../hooks/debounce.hook";
import { ROUTES } from "../../../constants";
import { createSection, editSection } from "../../../services/sectionServices";

import { TopicForm } from "./TopicForm/TopicForm";
import { Upload } from "../../components/Upload/Upload";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import { Button } from "../../../components/Button/Button";

import s from "./SectionEditor.module.scss";

export const SectionEditor: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const { logoutUser, token } = useContext(AuthContext);
  const {
    edit,
    setEdit,
    editData,
    setEditData,
    sectionTitle,
    setSectionTitle,
    topics,
    setTopics,
    addTopic,
    uploadOpen,
  } = useContext(EditContext);
  const [title, setTitle] = useState<string>();
  const dTitle = useDebounce(title, 1000);

  const message = useMessage();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    handleLocation(location);
    setSectionTitle(dTitle);
    if (!edit) {
      setTopics([]);
    }
  }, [handleLocation, location, dTitle]);

  useEffect(() => {
    if (logoutUser) {
      history.push(ROUTES.login);
    }
  }, [logoutUser]);

  const handleSubmit = async () => {
    if (!edit) {
      const newSection = {
        title: sectionTitle,
        order: 0,
        topics,
      };
      const response = await createSection(newSection, token);

      if (response.ok) {
        history.push(ROUTES.AMainPanel);
      }
      message(response);
    }

    if (edit) {
      const editedSection = {
        _id: editData._id,
        title: sectionTitle,
        order: editData.order,
        topics,
      };
      const response = await editSection(editedSection, token);

      if (response.ok) {
        setEditData(null);
        history.push(ROUTES.AMainPanel);
      }
      message(response);
    }
  };

  return (
    <>
      {uploadOpen && <Upload />}
      <div className={s.container}>
        <Dashboard />
        <div className={s.panel}>
          <div className={s.form}>
            <Button text="Submit" clickHandler={handleSubmit} success />
            <div className={s.sectionTitle}>
              <input
                type="text"
                name="sectionTitle"
                placeholder="   "
                value={sectionTitle}
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
                .map((item: ITopic) => (
                  <TopicForm key={item._id} item={item} />
                ))}
            <Button text="Add Topic" clickHandler={() => addTopic()} success />
          </div>
        </div>
      </div>
    </>
  );
};
