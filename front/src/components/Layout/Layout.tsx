import React from "react";

import { Rail } from "./Rail/Rail";
import { Color } from "./Color/Color";
import { Window } from "./Window/Window";
import { Stretch } from "./Stretch/Stretch";
import { VideoBox } from "./VideoBox/VideoBox";
import { ItemsList } from "./ItemsList/ItemsList";

import "./Layout.scss";

interface ILayout {
  layout: string;
  topicImgs?: Array<Object>;
  video?: string;
}

export const Layout: React.FC<ILayout> = ({ layout, topicImgs, video }) => {
  switch (layout) {
    case "rail":
      return (
        <div className="content rail">
          {topicImgs?.map((data: any) => (
            <Rail {...data} key={data._id} />
          ))}
        </div>
      );
    case "color":
      return (
        <div className="color">
          {topicImgs?.map((data: any) => (
            <Color {...data} key={data._id} />
          ))}
        </div>
      );
    case "window":
      return (
        <div className="content window">
          {topicImgs?.map((data: any) => (
            <Window {...data} key={data._id} />
          ))}
        </div>
      );
    case "stretch":
      return (
        <div className="content stretch">
          {topicImgs?.map((data: any) => (
            <Stretch {...data} key={data._id} />
          ))}
        </div>
      );
    case "itemsList":
      return (
        <div className="content itemsList">
          {topicImgs?.map((data: any) => (
            <ItemsList {...data} key={data._id} />
          ))}
        </div>
      );
    case "videoBox":
      return <VideoBox videoSrc={video ? video : ""} />;
    default:
      return (
        <div className="content stretch">
          {topicImgs?.map((data: any) => (
            <Stretch {...data} key={data._id} />
          ))}
        </div>
      );
  }
};
