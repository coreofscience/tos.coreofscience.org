import React, { FC, Fragment, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "./schema";
import { defaultLoginFormFieldsState } from "./constants/defaultState";

import { LoginFormFieldsType } from "./types";

import "../common/styles.css";
import TreeOfScience from "../../vectors/TreeOfScience";
import { Message } from "../common/Message";

const LogIn: FC = () => {
  const form = useForm<LoginFormFieldsType>({
    defaultValues: defaultLoginFormFieldsState,
    resolver: yupResolver(loginSchema),
    reValidateMode: "onSubmit",
    mode: "onSubmit",
  });

  const onLoginSubmit = useCallback((data: LoginFormFieldsType) => {
    console.log(data);
  }, []);

  return (
    <Fragment>
      <div className="container">
        <form className="content" onSubmit={form.handleSubmit(onLoginSubmit)}>
          <TreeOfScience className="content-logo" />
          <h2>Log In</h2>
          <input {...form.register("email")} type="text" placeholder="E-mail" />
          <Message
            message={form.formState.errors.email?.message}
            type="error"
          />
          <input
            {...form.register("password")}
            type="password"
            placeholder="Password"
          />
          <Message
            message={form.formState.errors.password?.message}
            type="error"
          />
          <br />
          <input
            type="submit"
            className="btn btn-large btn-leaf"
            value="LOG IN"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default LogIn;
