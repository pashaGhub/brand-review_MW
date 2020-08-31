import React, { useState, useRef, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

import { Dashboard } from "../../components/Dashboard/Dashboard";

import s from "./MainPanel.module.scss";
import { isNull } from "util";

const data = [
  { title: "Invitation", items: ["1", "2"] },
  { title: "Colors" },
  { title: "Our Video" },
  { title: "Greeding" },
];

export const MainPanel: React.FC = () => {
  const { handleLocation } = useContext(AppContext);

  const location = useLocation();
  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef<any>();
  const dragNode = useRef<any>();

  const handleDragStart = (e: any, sctI: number) => {
    dragItem.current = sctI;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e: any, sctI: number) => {
    const currentItem = dragItem.current;
    if (currentItem !== dragNode.current) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList.splice(sctI, 0, newList.splice(currentItem, 1)[0]);
        dragItem.current = sctI;
        return newList;
      });
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  // handle style of dragging item
  const getStyles = (item: number) => {
    if (dragItem.current === item) {
      return `${s.current} ${s.section}`;
    }

    return s.section;
  };

  const deleteSection = (stcI: number) => {
    if (
      window.confirm(
        "Section will be deleted  IRREVERSIBLY!  Do you really want to proceed?"
      )
    ) {
      const newList = list.filter((item, ind) => ind !== stcI);
      console.log(newList);

      return setList([...newList]);
    }
  };

  return (
    <div className={s.container}>
      <Dashboard />
      <div className={s.panel}>
        {list.map((sct, sctI) => (
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, sctI)}
            onDragEnter={
              dragging
                ? (e) => {
                    handleDragEnter(e, sctI);
                  }
                : isNull
            }
            key={sctI}
            className={dragging ? getStyles(sctI) : s.section}
          >
            {sct.title}
            <button
              type={"button"}
              onClick={() => deleteSection(sctI)}
              className={s.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
