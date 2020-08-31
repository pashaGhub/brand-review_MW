import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppContext, AuthContext } from "../../../context";
import { useHttp, useMessage } from "../../../hooks";

import s from "./Login.module.scss";

interface ILoginForm {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const { login } = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();
  const { handleSubmit, register, errors } = useForm<ILoginForm>();

  const location = useLocation();
  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const onSubmit = async (props: ILoginForm) => {
    console.log(props);
    try {
      const data = await request("api/auth/login", "POST", { ...props });
      login(data.token, data.userId);
    } catch (e) {}
  };

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
              name="password"
              placeholder="   "
              ref={register({
                required: "Required",
              })}
            />

            <label className={s.labelInside} htmlFor="password">
              Password
            </label>
          </div>

          <div>
            <button type="submit" disabled={loading} className={s.button}>
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
