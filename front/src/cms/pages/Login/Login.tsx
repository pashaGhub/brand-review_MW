import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../../../services/authServices";
import { AppContext, AuthContext } from "../../../context";
import { useMessage } from "../../../hooks";
import { ROUTES } from "../../../constants";

import s from "./Login.module.scss";

interface ILoginForm {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const { token, login, logoutUser } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const { handleSubmit, register, errors } = useForm<ILoginForm>();

  const message = useMessage();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  useEffect(() => {
    if (!logoutUser) {
      history.push(ROUTES.AMainPanel);
    }
  }, [logoutUser]);

  const onSubmit = async (props: ILoginForm) => {
    setLoading(true);
    const data = await loginUser(props, token);

    if (data.token) {
      login(data.token, data.userId);
      history.push(ROUTES.AMainPanel);
      setLoading(false);
    } else {
      message(data);
      setLoading(false);
    }
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
