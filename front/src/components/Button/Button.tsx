import React from "react";

import s from "./Button.module.scss";

interface IButton {
  text: string;
  clickHandler: Function;
  success?: any;
  danger?: any;
  className?: string;
}

export const Button: React.FC<IButton> = ({
  text = "button",
  clickHandler,
  success,
  danger,
  className,
}) => {
  let styles = `${s.button}`;
  if (success) {
    styles = `${s.button} ${s.success}`;
  }
  if (danger) {
    styles = `${s.button} ${s.danger}`;
  }

  if (className) {
    styles = `${styles} ${className}`;
  }

  return (
    <button type="button" onClick={() => clickHandler()} className={styles}>
      {text}
    </button>
  );
};
