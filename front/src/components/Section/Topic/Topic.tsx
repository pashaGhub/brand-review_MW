import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { Layout } from "../../Layout/Layout";

import s from "./Topic.module.scss";

interface ITopic {
  data: any;
}

export const Topic: React.FC<ITopic> = ({ data }) => {
  return (
    <>
      <div className={s.topic} id={data._id}>
        <div className={s.title}>
          <div className={s.name}>
            {data.title}
            <button>
              <FontAwesomeIcon icon={faLink} />
            </button>
          </div>
          <span className={s.line}></span>
        </div>

        <p className={s.text}>{data.text}</p>

        <Layout
          layout={data.layout}
          topicImgs={data.topicImgs}
          video={data.topicVideo}
        />
      </div>
    </>
  );
};
