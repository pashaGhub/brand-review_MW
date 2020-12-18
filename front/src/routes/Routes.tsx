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
import { Error404 } from "../pages/Error404/Error404";

export const Routes: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // if (isAuthenticated) {
  //   return (
  //     <Switch>
  //       {isAuthenticated && <><Route exact path={ROUTES.overview} component={Overview} />
  //       <Route exact path={ROUTES.AMainPanel} component={MainPanel} />
  //       <Route exact path={ROUTES.ACreateSection} component={SectionEditor} />
  //       <Route component={Error404} /></>}

  //     </Switch>
  //   );
  // }

  return (
    <Switch>
      {isAuthenticated && (
        <>
          <Route exact path={ROUTES.overview} component={Overview} />
          <Route exact path={ROUTES.AMainPanel} component={MainPanel} />
          <Route exact path={ROUTES.ACreateSection} component={SectionEditor} />
        </>
      )}
      <Route exact path={ROUTES.publicHome} component={Home} />
      <Route exact path={ROUTES.login} component={Login} />
      <Route exact path={ROUTES.register} component={Register} />
      <Route component={Error404} />
    </Switch>
  );
};
