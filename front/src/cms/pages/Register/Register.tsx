import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppContext, AuthContext } from "../../../context";
import { useHttp, useMessage } from "../../../hooks";

import s from "./Register.module.scss";

interface IRegisterForm {
  email: string;
  password: string;
  rePassword: string;
}

export const Register: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const { login } = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();

  const [passCheck, setPassCheck] = useState<boolean>(false);
  const { handleSubmit, register, errors } = useForm<IRegisterForm>();

  const location = useLocation();
  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const onSubmit = async (props: IRegisterForm): Promise<any> => {
    const { email, password, rePassword } = props;
    if (password !== rePassword) {
      return setPassCheck(true);
    }

    setPassCheck(false);
    try {
      const data = await request("api/auth/register", "POST", {
        email,
        password,
      });
      login(data.token, data.userId);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.title}>
        <h2>Registration</h2>
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
              type="password"
              name="password"
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

            <label className={s.labelInside} htmlFor="password">
              Password
            </label>
            <div className={s.error}>
              {errors.password && errors.password.message}
              {passCheck && "Passwords do not match"}
            </div>
          </div>
          <div className={s.formItem}>
            <input
              type="password"
              name="rePassword"
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

            <label className={s.labelInside} htmlFor="rePassword">
              Repeat password
            </label>
            <div className={s.error}>
              {errors.rePassword && errors.rePassword.message}
              {passCheck && "Passwords do not match"}
            </div>
          </div>

          <div>
            <button type="submit" disabled={loading} className={s.button}>
              Create user
            </button>
          </div>
        </form>
        <Link to="/login" className={s.link}>
          Login
        </Link>
      </div>
    </div>
  );
};
