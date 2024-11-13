import useFirebase from "../../../hooks/useFirebase";
import useNext from "../../../hooks/useNext";
import useUser from "../../../hooks/useUser";
import { AsyncActionStateType } from "../../../types/asyncActionStateType";
import { Message } from "../../common/Message";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FC, Fragment, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { object, string } from "yup";

type LogInFormFieldsType = {
  email: string;
  password: string;
};

const loginSchema = object()
  .shape({
    email: string().required().email("Invalid email address"),
    password: string().required().min(8, "Invalid password"),
  })
  .required();

const messageByErrorCodeMap: Record<string, string> = {
  "auth/user-not-found": "Couldn't find your account",
  "auth/wrong-password":
    "Unable to log in, please be sure to use the proper email/password",
};

type LogInActionsType = {
  logIn: (data: LogInFormFieldsType) => void;
};

export const useSignIn = (): [AsyncActionStateType, LogInActionsType] => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [state, setState] = useState<AsyncActionStateType>({
    status: "idle",
    message: "",
  });
  const { next } = useNext();

  const logIn = useCallback(
    (data: LogInFormFieldsType) => {
      signInWithEmailAndPassword(firebase.auth, data.email, data.password)
        .then(() => {
          setState({ status: "success", message: "Successfully logged in" });
          navigate(next || "/tos");
        })
        .catch((error) => {
          setState({
            status: "failure",
            message:
              messageByErrorCodeMap[error.code] ??
              "There was an error loggin in to your account, please try again",
          });
        });
    },
    [firebase.auth, navigate, next],
  );

  return [state, { logIn }];
};

const LogIn: FC = () => {
  const form = useForm<LogInFormFieldsType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const [logInState, logInActions] = useSignIn();

  const { next, nextSearch } = useNext();
  const user = useUser();

  if (user && next) {
    return <Navigate to={next} />;
  }

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
          to={{
            pathname: "/reset-password",
            search: nextSearch,
          }}
          className="text-sky-600 transition-colors ease-in hover:text-sky-800 active:text-sky-800"
        >
          Forgot your password?
        </Link>
      </form>
    </Fragment>
  );
};

export default LogIn;
