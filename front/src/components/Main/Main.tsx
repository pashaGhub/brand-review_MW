import React, { useEffect, useState } from "react";
import { getSections } from "../../services/sectionServices";

import { Navbar } from "./Navbar/Navbar";
import { Board } from "./Board/Board";

import s from "./Main.module.scss";

export const Main: React.FC = () => {
  const [sections, setSections] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSections();

      if (data.length) {
        setSections(data.sort((a: any, b: any) => a.order - b.order));
      } else {
        setSections([]);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={s.container}>
      {sections.length > 0 && <Navbar data={sections} />}
      <Board data={sections} />
    </div>
  );
};
