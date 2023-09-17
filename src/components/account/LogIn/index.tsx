import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(logInActions.logIn)}
      >
        <h2 className="text-2xl md:text-4xl font-tall uppercase">Log In</h2>
        <div className="flex flex-col gap-2">
          <input
            {...form.register("email")}
            type="email"
            className="p-2 border border-stone-500"
            placeholder="email@example.com"
          />
          <Message
            message={form.formState.errors.email?.message}
            type="error"
          />
        </div>
        <div className="flex flex-col gap-2">
          <input
            {...form.register("password")}
            type="password"
            className="p-2 border border-stone-500"
            placeholder="password"
          />
          <Message
            message={form.formState.errors.password?.message}
            type="error"
          />
        </div>
        <div>
          <input
            type="submit"
            className="px-4 py-2 font-tall uppercase font-bold text-slate-50 bg-leaf"
            value="LOG IN"
          />
        </div>
        <Message
          message={logInState.message}
          type={logInState.status === "failure" ? "error" : "info"}
        />
        <Link
          to="/reset-password"
          className="text-sky-600 hover:text-sky-800 active:text-sky-800 transition-colors ease-in"
        >
          Forgot your password?
        </Link>
      </form>
    </Fragment>
  );
};

export default LogIn;
