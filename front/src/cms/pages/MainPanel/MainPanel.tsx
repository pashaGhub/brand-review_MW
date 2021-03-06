import React, { useState, useRef, useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Spin } from "antd";
import { useMessage } from "../../../hooks/message.hook";
import { AppContext, AuthContext, EditContext } from "../../../context";
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
  const { setEditData, setEdit, setSectionTitle, setTopics } = useContext(
    EditContext
  );
  const [sectionsList, setSectionsList] = useState([]);
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
    setEdit(false);
    setEditData(null);
  }, [handleLocation, location]);

  useEffect(() => {
    if (logoutUser) {
      history.push(ROUTES.login);
    }
  }, [logoutUser]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const data = await getSections();

      if (data.status === 401) {
        logout();
        history.push(ROUTES.login);
      }

      if (data.length) {
        setSectionsList(data.sort((a: ITopic, b: ITopic) => a.order - b.order));
      } else {
        setSectionsList([]);
      }
      setLoading(false);
    };
    if (!orderChanged && token) {
      fetchData();
    }
  }, [token, orderChanged]);

  useEffect(() => {
    const fetchData = async () => {
      const newOrder = sectionsList.map((item: any, ind: number) => {
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
      setSectionsList((oldList: any) => {
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

  const handleEdit = (props: any) => {
    setEditData(props);
    setSectionTitle(props.title);
    setTopics(props.topics);
    setEdit(true);
    history.push(ROUTES.ACreateSection);
  };

  return (
    <div className={s.container}>
      <Dashboard />
      <Spin spinning={loading} tip="loading..." wrapperClassName={s.panel}>
        {sectionsList.length > 0
          ? sectionsList.map((sct: any, sctI: number) => (
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
                key={sct._id}
                className={dragging ? getStyles(sctI) : s.section}
              >
                {sct.title}
                <div>
                  <button
                    type={"button"}
                    onClick={() => handleEdit(sct)}
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
