import React, { useState, useRef, useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { notification } from "antd";
import { AppContext, AuthContext } from "../../../context";
import { ITopic } from "../../../context/EditContext";
import {
  getSections,
  deleteSection,
  changeSectionsOrder,
} from "../../../services/sectionServices";

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
  const { token, logout } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [orderChanged, setOrderChanged] = useState(false);
  const dragItem = useRef<any>();
  const dragNode = useRef<any>();

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getSections(token);

      if (data.status === 401) {
        logout();
        history.push("/login");
      }

      if (data.length) {
        setList(data.sort((a: ITopic, b: ITopic) => a.order - b.order));
      }
    };
    if (!orderChanged) {
      fetchData();
    }
    setLoading(false);
  }, [token, orderChanged]);

  useEffect(() => {
    const fetchData = async () => {
      const newOrder = list.map((item: any, ind: number) => {
        return { _id: item._id, order: ind + 1 };
      });
      const response = await changeSectionsOrder(newOrder, token);

      if (response.status === 401) {
        logout();
        history.push("/login");
      }

      if (response.ok) {
        notification["success"]({
          message: "Success",
          description: "Order successfully updated",
          duration: 20,
        });
      } else {
        notification["error"]({
          message: "Error",
          description: "Something went wrong...",
          duration: 20,
        });
      }

      setOrderChanged(false);
    };

    if (orderChanged) {
      fetchData();
    }
  }, [orderChanged]);

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

    setOrderChanged(true);
  };

  // handle style of dragging item
  const getStyles = (item: number) => {
    if (dragItem.current === item) {
      return `${s.current} ${s.section}`;
    }

    return s.section;
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm(
        "Section will be deleted  IRREVERSIBLY!  Do you really want to proceed?"
      )
    ) {
      const response = await deleteSection(id, token);

      if (response.ok) {
        notification["success"]({
          message: "Success",
          description: "Section successfully deleted",
          duration: 20,
        });
        setOrderChanged(true);
      } else {
        notification["error"]({
          message: "Error",
          description: "Something went wrong...",
          duration: 20,
        });
      }
    }
  };
  console.log(list);

  return (
    <div className={s.container}>
      <Dashboard />
      {loading && <div>loading...</div>}
      {!loading && (
        <div className={s.panel}>
          {list.length > 0 ? (
            list.map((sct: any, sctI: number) => (
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
                <div>
                  <button
                    type={"button"}
                    onClick={() => {}}
                    className={`${s.btn} ${s.edit}`}
                  >
                    Edit
                  </button>
                  <button
                    type={"button"}
                    onClick={() => handleDelete(sct._id)}
                    className={`${s.btn} ${s.delete}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>there is no sections</div>
          )}
        </div>
      )}
    </div>
  );
};
