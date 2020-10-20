import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ROUTES } from "../constants";
import { AuthContext } from "../context";

import { SectionEditor } from "../cms/pages/SectionEditor/SectionEditor";
import { MainPanel } from "../cms/pages/MainPanel/MainPanel";
import { Register } from "../cms/pages/Register/Register";
import { Login } from "../cms/pages/Login/Login";
import { Overview } from "../cms/pages/Overview/Overview";
import { Home } from "../pages/Home";

export const Routes: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path={ROUTES.overview} component={Overview} />
        <Route exact path={ROUTES.AMainPanel} component={MainPanel} />
        <Route exact path={ROUTES.ACreateSection} component={SectionEditor} />
        {/* <Redirect to={ROUTES.AMainPanel} /> */}
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path={ROUTES.publicHome} component={Home} />
      <Route exact path={ROUTES.login} component={Login} />
      <Route exact path={ROUTES.register} component={Register} />
      {/* <Redirect to={ROUTES.publicHome} /> */}
    </Switch>
  );
};
