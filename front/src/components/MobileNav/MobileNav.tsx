import React, { useContext } from "react";
import { Link } from "react-scroll";
import { AppContext } from "../../context/AppContext";

import s from "./MobileNav.module.scss";

export const MobileNav: React.FC = () => {
  const { sections, setSections, mobNav } = useContext(AppContext);

  let navStyle = `${s.mobileNav}`;
  if (mobNav) {
    navStyle = `${s.mobileNav} ${s.open}`;
  }

  return (
    <div className={navStyle}>
      {sections.length &&
        sections.map((item: any) => (
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
  );
};
