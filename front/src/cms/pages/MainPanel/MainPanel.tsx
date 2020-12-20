import React, { useState, useRef, useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { message, notification, Spin } from "antd";
import { useMessage } from "../../../hooks/message.hook";
import { AppContext, AuthContext } from "../../../context";
import { ITopic } from "../../../context/EditContext";
import { ROUTES } from "../../../constants";
import {
  getSections,
  deleteSection,
  changeSectionsOrder,
} from "../../../services/sectionServices";

import { Dashboard } from "../../components/Dashboard/Dashboard";

import s from "./MainPanel.module.scss";
import { isNull } from "util";

export const MainPanel: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const { token, logout, logoutUser } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [orderChanged, setOrderChanged] = useState(false);
  const dragItem = useRef<any>();
  const dragNode = useRef<any>();

  const message = useMessage();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  useEffect(() => {
    if (logoutUser) {
      history.push(ROUTES.login);
    }
  }, [logoutUser]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const data = await getSections(token);

      if (data.status === 401) {
        logout();
        history.push(ROUTES.login);
      }

      if (data.length) {
        setList(data.sort((a: ITopic, b: ITopic) => a.order - b.order));
      } else {
        setList([]);
      }
      setLoading(false);
    };
    if (!orderChanged && token) {
      fetchData();
    }
  }, [token, orderChanged]);

  useEffect(() => {
    const fetchData = async () => {
      const newOrder = list.map((item: any, ind: number) => {
        return { _id: item._id, order: ind + 1 };
      });
      const response = await changeSectionsOrder(newOrder, token);

      if (response.status === 401) {
        logout();
        history.push(ROUTES.login);
      }

      await message(response);

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
      await message(response);

      if (response.ok) {
        setOrderChanged(true);
      }
    }
  };

  return (
    <div className={s.container}>
      <Dashboard />
      <Spin spinning={loading} tip="loading..." wrapperClassName={s.panel}>
        {list.length > 0
          ? list.map((sct: any, sctI: number) => (
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
          : !loading && <h1 className={s.noSections}>There is no sections</h1>}
      </Spin>
    </div>
  );
};
