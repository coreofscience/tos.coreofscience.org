import { Message } from "../common/Message";
import { defaultLoginFormFieldsState } from "./constants/defaultState";
import { useSignIn } from "./hooks/useLogIn";
import { loginSchema } from "./schema";
import { LogInFormFieldsType } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, Fragment } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LogIn: FC = () => {
  const form = useForm<LogInFormFieldsType>({
    defaultValues: defaultLoginFormFieldsState,
    resolver: yupResolver(loginSchema),
  });

  const [logInState, logInActions] = useSignIn();

  return (
    <Fragment>
      <form
        className="m-auto flex max-w-md flex-col gap-4"
        onSubmit={form.handleSubmit(logInActions.logIn)}
      >
        <h2 className="font-tall text-2xl uppercase md:text-4xl">Log In</h2>
        <div className="flex flex-col gap-2">
          <input
            {...form.register("email")}
            type="email"
            className="rounded-sm border border-stone-500 p-2"
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
            className="rounded-sm border border-stone-500 p-2"
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
            className="rounded-sm bg-leaf px-4 py-2 font-tall font-bold uppercase text-slate-50"
            value="LOG IN"
          />
        </div>
        <Message
          message={logInState.message}
          type={logInState.status === "failure" ? "error" : "info"}
        />
        <Link
          to="/reset-password"
          className="text-sky-600 transition-colors ease-in hover:text-sky-800 active:text-sky-800"
        >
          Forgot your password?
        </Link>
      </form>
    </Fragment>
  );
};

export default LogIn;
