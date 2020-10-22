import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import dark from "../../../assets/imgs/dark.jpg";
import blue from "../../../assets/imgs/blue.jpg";
import azure from "../../../assets/imgs/azure.jpg";
import grey from "../../../assets/imgs/grey.jpg";
import tropic from "../../../assets/imgs/tropic.jpg";

import { Layout } from "../../Layout/Layout";

import s from "./Topic.module.scss";

export const Topic: React.FC = () => {
  const simpleText = [
    {
      image: tropic,
      imgText: "some text about image",
    },
    {
      image: tropic,
      imgText:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati labore adipisci sunt suscipit sint ex aperiam? Tenetur error",
    },
    {
      image: tropic,
      imgText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    {
      image: tropic,
      imgText: "Lorem ipsum dolor sit amet",
    },
  ];

  const color = [
    { image: dark, imgText: ["#333", "hex", "RGB	51 3	0", "CMYK	0	94 100 80"] },
    { image: blue, imgText: ["#333", "hex", "RGB	51 3	0", "CMYK	0	94 100 80"] },
    { image: azure, imgText: ["#333", "hex", "RGB	51 3	0", "CMYK	0	94 100 80"] },
    { image: grey, imgText: ["#333", "hex", "RGB	51 3	0", "CMYK	0	94 100 80"] },
  ];

  const simpleList = [
    {
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      alt: "yourAlt",
      imgText: "Something about image",
    },
    {
      image:
        "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      alt: "yourAlt",
      imgText: "Something about image",
    },
    {
      image:
        "https://images.unsplash.com/photo-1547480053-7d174f67b557?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      alt: "yourAlt",
      subtitle: "image subtitle",
      imgText: "Something about image",
    },
    {
      image:
        "https://images.unsplash.com/photo-1481481525014-91e77115eace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      alt: "yourAlt",
      subtitle: "image subtitle",
      imgText: "Something about image",
    },
    {
      image:
        "https://images.unsplash.com/photo-1505664063603-28e48ca204eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      alt: "yourAlt",
      subtitle: "image subtitle",
      imgText: "Something about image",
    },
  ];
  return (
    <>
      <div className={s.topic}>
        <div className={s.title}>
          <div className={s.name}>
            Invitation
            <button>
              <FontAwesomeIcon icon={faLink} />
            </button>
          </div>
          <span className={s.line}></span>
        </div>

        <p className={s.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          corrupti? Illum esse dicta impedit architecto magnam dolorem ea
          officiis adipisci doloremque quia sapiente deleniti repellat rerum,
          dolorum commodi enim perspiciatis.
        </p>

        <Layout layout="Rail" topicImgs={simpleText} />
      </div>
      <div className={s.topic}>
        <div className={s.title}>
          <div className={s.name}>
            Agenda
            <button>
              <FontAwesomeIcon icon={faLink} />
            </button>
          </div>
          <span className={s.line}></span>
        </div>

        <p className={s.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          corrupti? Illum esse dicta impedit architecto magnam dolorem ea
          officiis adipisci doloremque quia sapiente deleniti repellat rerum,
          dolorum commodi enim perspiciatis.
        </p>

        <Layout layout="Window" />
      </div>
      <div className={s.topic}>
        <div className={s.title}>
          <div className={s.name}>
            Agenda
            <button>
              <FontAwesomeIcon icon={faLink} />
            </button>
          </div>
          <span className={s.line}></span>
        </div>

        <p className={s.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          corrupti? Illum esse dicta impedit architecto magnam dolorem ea
          officiis adipisci doloremque quia sapiente deleniti repellat rerum,
          dolorum commodi enim perspiciatis.
        </p>

        <Layout layout="Stretch" />
      </div>
      <div className={s.topic}>
        <div className={s.title}>
          <div className={s.name}>
            Invitation
            <button>
              <FontAwesomeIcon icon={faLink} />
            </button>
          </div>
          <span className={s.line}></span>
        </div>

        <p className={s.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          corrupti? Illum esse dicta impedit architecto magnam dolorem ea
          officiis adipisci doloremque quia sapiente deleniti repellat rerum,
          dolorum commodi enim perspiciatis.
        </p>

        <Layout layout="Color" topicImgs={color} />
      </div>

      <div className={s.topic}>
        <div className={s.title}>
          <div className={s.name}>
            Video
            <button>
              <FontAwesomeIcon icon={faLink} />
            </button>
          </div>
          <span className={s.line}></span>
        </div>

        <p className={s.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          corrupti? Illum esse dicta impedit architecto magnam dolorem ea
          officiis adipisci doloremque quia sapiente deleniti repellat rerum,
          dolorum commodi enim perspiciatis.
        </p>

        <Layout layout="Video" />
      </div>
      <div className={s.topic}>
        <div className={s.title}>
          <div className={s.name}>
            Simple list
            <button>
              <FontAwesomeIcon icon={faLink} />
            </button>
          </div>
          <span className={s.line}></span>
        </div>

        <p className={s.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          corrupti? Illum esse dicta impedit architecto magnam dolorem ea
          officiis adipisci doloremque quia sapiente deleniti repellat rerum,
          dolorum commodi enim perspiciatis.
        </p>

        <Layout layout="ItemsList" topicImgs={simpleList} />
      </div>
    </>
  );
};
