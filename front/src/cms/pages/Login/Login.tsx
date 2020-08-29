import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../context/AppContext";

import s from "./Login.module.scss";

interface ILoginForm {
  email: string;
  pass: string;
}

export const Login: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const { handleSubmit, register, errors } = useForm<ILoginForm>();

  const location = useLocation();
  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  const onSubmit = (props: ILoginForm) => console.log(props);

  return (
    <div className={s.container}>
      <div className={s.title}>
        <h2>Admin Panel</h2>
      </div>
      <div className={s.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.formItem}>
            <input
              type="text"
              name="email"
              placeholder="   "
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
            <label className={s.labelInside} htmlFor="email">
              E-mail
            </label>

            <div className={s.error}>
              {errors.email && errors.email.message}
            </div>
          </div>

          <div className={s.formItem}>
            <input
              type="Password"
              name="pass"
              placeholder="   "
              ref={register({
                required: "Required",
                pattern: {
                  value: /^((?!.*[\s])([A-Za-z0-9]).{5,15})$/i,
                  message:
                    "Password should not contain white spaces and be 6 to 15 in length",
                },
              })}
            />

            <label className={s.labelInside} htmlFor="pass">
              Password
            </label>
            <div className={s.error}>{errors.pass && errors.pass.message}</div>
          </div>

          <div>
            <button type="submit" className={s.button}>
              Login
            </button>
          </div>
        </form>
        <Link to="/register" className={s.link}>
          Create user
        </Link>
      </div>
    </div>
  );
};
