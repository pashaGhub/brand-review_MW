import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { Topic } from "./Topic/Topic";

import s from "./Section.module.scss";

export const Section: React.FC = () => {
  return (
    <div className={s.container}>
      <div className={s.title}>
        <span>Hello here!</span>
        <span>
          <button>
            <FontAwesomeIcon icon={faLink} />
          </button>
        </span>
      </div>
      <Topic />
    </div>
  );
};
