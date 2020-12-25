import React from "react";
import { Link } from "react-scroll";

import s from "./Navbar.module.scss";

interface INavbar {
  data: any;
}

export const Navbar: React.FC<INavbar> = ({ data }) => {
  return (
    <div className={s.container}>
      <div className={s.positionSticky}>
        {data.length &&
          data.map((item: any) => (
            <div key={item._id} className={s.section}>
              <Link
                className={s.title}
                activeClass={s.titleActive}
                to={item._id}
                hashSpy={true}
                spy={true}
                smooth={true}
                offset={-50}
                duration={1000}
                delay={100}
              >
                {item.title}
              </Link>
              <ul>
                {item?.topics?.map((topic: any) => (
                  <li key={topic._id}>
                    <Link
                      className={s.topic}
                      activeClass={s.topicActive}
                      to={topic._id}
                      hashSpy={true}
                      spy={true}
                      smooth={true}
                      offset={-50}
                      duration={1000}
                      delay={100}
                    >
                      {topic.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};
