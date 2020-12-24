import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { Topic } from "./Topic/Topic";

import s from "./Section.module.scss";

interface ISection {
  data: any;
}

export const Section: React.FC<ISection> = ({ data }) => {
  return (
    <div className={s.container} id={data._id}>
      <div className={s.title}>
        <span>{data.title}</span>
        <span>
          <button>
            <FontAwesomeIcon icon={faLink} />
          </button>
        </span>
      </div>
      {data?.topics?.map((topic: any) => (
        <Topic data={topic} key={topic.id} />
      ))}
    </div>
  );
};
