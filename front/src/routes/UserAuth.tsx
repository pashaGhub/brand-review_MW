import React from "react";
import { Route } from "react-router-dom";

import { Login } from "../cms/pages/Login/Login";
import { Register } from "../cms/pages/Register/Register";
import { MobileNav } from "../components/MobileNav/MobileNav";

export const UserAuth: React.FC = () => {
  return (
    <>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </>
  );
};
