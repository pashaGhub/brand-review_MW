import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContext } from "./context";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { MobileNav } from "./components/MobileNav/MobileNav";
import { MobDashboard } from "./cms/components/MobDashboard/MobDashboard";
import { Routes } from "./routes/Routes";

import s from "./App.module.scss";

export const App: React.FC = () => {
  const { location } = useContext(AppContext);

  return (
    <div className={s.App}>
      <Header />

      <Router>
        {location === "public" && <MobileNav />}
        {location === "admin" && <MobDashboard />}
        <Routes />
      </Router>

      <Footer />
    </div>
  );
};
