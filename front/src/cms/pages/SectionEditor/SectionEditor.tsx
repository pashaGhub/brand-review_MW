import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../context/AppContext";

import { TopicForm } from "./TopicForm/TopicForm";
import { Dashboard } from "../../components/Dashboard/Dashboard";

import s from "./SectionEditor.module.scss";

export const SectionEditor: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const { register, handleSubmit } = useForm<any>();

  const location = useLocation();
  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  const onSubmit = (data: any) => {
    console.log(JSON.stringify(data));
  };

  return (
    <div className={s.container}>
      <Dashboard />
      <div className={s.panel}>
        <div className={s.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.sectionTitle}>
              <input
                type="text"
                name="sectionTitle"
                placeholder="   "
                ref={register({
                  required: "Required",
                })}
              />
              <label className={s.labelInside} htmlFor="sectionTitle">
                Section title
              </label>
            </div>
            <TopicForm />
          </form>
        </div>
      </div>
    </div>
  );
};
