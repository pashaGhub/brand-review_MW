import React from "react";

import s from "./Button.module.scss";

interface IButton {
  text: string;
  clickHandler: Function;
  success?: any;
  danger?: any;
}

export const Button: React.FC<IButton> = ({
  text = "button",
  clickHandler,
  success,
  danger,
}) => {
  let styles = `${s.button}`;
  if (success) {
    styles = `${s.button} ${s.success}`;
  }
  if (danger) {
    styles = `${s.button} ${s.danger}`;
  }

  return (
    <button type="button" onClick={() => clickHandler()} className={styles}>
      {text}
    </button>
  );
};
