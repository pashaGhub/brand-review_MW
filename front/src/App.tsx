import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROUTES } from "./constants";
import { AppContext } from "./context/AppContext";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { MobileNav } from "./components/MobileNav/MobileNav";
import { MobDashboard } from "./cms/components/MobDashboard/MobDashboard";
// import { UserAuth } from "./routes/UserAuth";

import { Home } from "./pages/Home";
import { Login } from "./cms/pages/Login/Login";
import { Register } from "./cms/pages/Register/Register";
import { MainPanel } from "./cms/pages/MainPanel/MainPanel";
import { NewSection } from "./cms/pages/NewSection/NewSection";

import s from "./App.module.scss";

export const App: React.FC = () => {
  const { location } = useContext(AppContext);

  return (
    <div className={s.App}>
      <Header />

      <Router>
        {location === "public" && <MobileNav />}
        {location === "admin" && <MobDashboard />}
        <Switch>
          <Route exact path={ROUTES.publicHome} component={Home} />
          <Route exact path={ROUTES.login} component={Login} />
          <Route exact path={ROUTES.register} component={Register} />
          <Route exact path={ROUTES.AMainPanel} component={MainPanel} />
          <Route exact path={ROUTES.ACreateSection} component={NewSection} />
        </Switch>
      </Router>

      <Footer />
    </div>
  );
};
