import React, { FC, Fragment } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "../common/styles.css";
import TreeOfScience from "../../vectors/TreeOfScience";

import { Message } from "../common/Message";

import { defaultLoginFormFieldsState } from "./constants/defaultState";
import { loginSchema } from "./schema";
import { useSignIn } from "./hooks/useLogIn";

import { LogInFormFieldsType } from "./types";

const LogIn: FC = () => {
  const form = useForm<LogInFormFieldsType>({
    defaultValues: defaultLoginFormFieldsState,
    resolver: yupResolver(loginSchema),
  });

  const [logInState, logInActions] = useSignIn();

  return (
    <Fragment>
      <div className="container">
        <form
          className="form-content"
          onSubmit={form.handleSubmit(logInActions.logIn)}
        >
          <TreeOfScience className="content-logo" />
          <h2>Log In</h2>
          <div className="form-input">
            <input
              {...form.register("email")}
              type="text"
              placeholder="E-mail"
            />
            <Message
              message={form.formState.errors.email?.message}
              type="error"
            />
          </div>
          <div className="form-input">
            <input
              {...form.register("password")}
              type="password"
              placeholder="Password"
            />
            <Message
              message={form.formState.errors.password?.message}
              type="error"
            />
          </div>
          <br />
          <input
            type="submit"
            className="btn btn-large btn-leaf"
            value="LOG IN"
          />
          <Message
            message={logInState.message}
            type={logInState.status === "failure" ? "error" : "info"}
          />
        </form>
      </div>
    </Fragment>
  );
};

export default LogIn;
