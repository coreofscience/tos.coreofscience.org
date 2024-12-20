import useFirebase from "../../../hooks/useFirebase";
import useNext from "../../../hooks/useNext";
import useUser from "../../../hooks/useUser";
import { Message } from "../../common/Message";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { FC, Fragment } from "react";
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

const logIn = async ({
  auth,
  email,
  password,
}: {
  auth: Auth;
  email: string;
  password: string;
}): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password);
};

const LogIn: FC = () => {
  const form = useForm<LogInFormFieldsType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const { next, nextSearch } = useNext();
  const user = useUser();
  const firebase = useFirebase();

  const {
    mutate: signIn,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: logIn,
    onSuccess: () => {
      navigate(next || "/tos");
    },
  });

  if (user && next) {
    return <Navigate to={next} />;
  }

  return (
    <Fragment>
      <form
        className="m-auto flex max-w-md flex-col gap-4"
        onSubmit={form.handleSubmit((data) =>
          signIn({
            auth: firebase.auth,
            email: data.email,
            password: data.password,
          }),
        )}
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
          message={
            isSuccess
              ? "Successfully logged you in."
              : isError
                ? "There was an issue logging you in."
                : ""
          }
          type={isError ? "error" : "info"}
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
