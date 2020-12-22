import React, { useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ROUTES } from "../../../constants";
import { AppContext, EditContext } from "../../../context";

import { Main } from "../../../components/Main/Main";

import s from "./Overview.module.scss";

export const Overview: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const { setEdit } = useContext(EditContext);

  const location = useLocation();
  useEffect(() => {
    handleLocation(location);
    setEdit(false);
  }, [handleLocation, location]);

  return (
    <>
      <Link to={ROUTES.AMainPanel} className={s.panelBtn}>
        Back to panel
      </Link>
      <Main />
    </>
  );
};
