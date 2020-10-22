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
}

export const Layout: React.FC<ILayout> = (props) => {
  const { layout, topicImgs } = props;

  switch (layout) {
    case "Rail":
      return (
        <div className="content rail">
          {topicImgs?.map((data: any, ind: number) => (
            <Rail {...data} key={ind} />
          ))}
        </div>
      );
    case "Color":
      return (
        <div className="color">
          {topicImgs?.map((data: any, ind: number) => (
            <Color {...data} key={ind} />
          ))}
        </div>
      );
    case "Window":
      return (
        <div className="content window">
          <Window />
        </div>
      );
    case "Stretch":
      return (
        <div className="content stretch">
          <Stretch />
        </div>
      );
    case "ItemsList":
      return (
        <div className="content itemsList">
          {topicImgs?.map((data: any, ind: number) => (
            <ItemsList {...data} key={ind} />
          ))}
        </div>
      );
    case "Video":
      return <VideoBox />;
    default:
      return (
        <div className="content stretch">
          <Stretch />
        </div>
      );
  }
};
