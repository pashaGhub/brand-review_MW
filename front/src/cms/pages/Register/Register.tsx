import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../context/AppContext";

import s from "./Register.module.scss";

interface IRegisterForm {
  email: string;
  pass: string;
  rePass: string;
}

export const Register: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const [passCheck, setPassCheck] = useState<boolean>(false);
  const { handleSubmit, register, errors } = useForm<IRegisterForm>();

  const location = useLocation();
  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  const onSubmit = (props: IRegisterForm) => {
    const { pass, rePass } = props;

    if (pass !== rePass) {
      return setPassCheck(true);
    }

    setPassCheck(false);
    return console.log(props);
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
            <div className={s.error}>
              {errors.pass && errors.pass.message}
              {passCheck && "Passwords do not match"}
            </div>
          </div>
          <div className={s.formItem}>
            <input
              type="password"
              name="rePass"
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

            <label className={s.labelInside} htmlFor="rePass">
              Repeat password
            </label>
            <div className={s.error}>
              {errors.rePass && errors.rePass.message}
              {passCheck && "Passwords do not match"}
            </div>
          </div>

          <div>
            <button type="submit" className={s.button}>
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
