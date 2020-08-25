import React from "react";

import { Main } from "./components/Main/Main";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { MobileNav } from "./components/MobileNav/MobileNav";

import s from "./App.module.scss";

export const App: React.FC = () => {
  return (
    <div className={s.App}>
      <Header />
      <MobileNav />
      <Main />
      <Footer />
    </div>
  );
};
