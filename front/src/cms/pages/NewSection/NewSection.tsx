import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

import s from "./NewSection.module.scss";

export const NewSection: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const location = useLocation();
  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  return <div className={s.container}>New section creation</div>;
};
