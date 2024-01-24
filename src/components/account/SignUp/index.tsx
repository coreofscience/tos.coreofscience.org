import { FC, Fragment } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signUpSchema } from "./schema";
import { defaultSignUpFormFieldsState } from "./constants/defaultState";

import { SignUpFormFieldsType } from "./types";

import { Message } from "../common/Message";
import { useSignUp } from "./hooks/useSignUp";

const SignUp: FC = () => {
  const form = useForm<SignUpFormFieldsType>({
    defaultValues: defaultSignUpFormFieldsState,
    resolver: yupResolver(signUpSchema),
  });

  const [signUpState, signUpActions] = useSignUp();

  return (
    <Fragment>
      <form
        className="m-auto flex max-w-md flex-col gap-4"
        onSubmit={form.handleSubmit(signUpActions.signUp)}
      >
        <h2 className="font-tall text-2xl uppercase md:text-4xl">Sign Up</h2>
        <div className="flex flex-col gap-2">
          <input
            {...form.register("name")}
            type="text"
            className="rounded-sm border border-stone-500 p-2"
            placeholder="Name"
          />
          <Message message={form.formState.errors.name?.message} type="error" />
        </div>
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
        <div className="flex flex-row items-baseline">
          <input
            {...form.register("acceptsEmail")}
            type="checkbox"
            className="mr-2 h-4 w-4"
          />
          <label className="text-gray-700" htmlFor="acceptsEmail">
            I like to receive the Tree of Science newsletter to stay in touch
            and to learn about latest trends on literature searches and new
            product features first.
          </label>
        </div>
        <div>
          <input
            type="submit"
            className="rounded-sm bg-leaf px-4 py-2 font-tall font-bold uppercase text-slate-50"
            value="SIGN UP"
          />
        </div>
        <Message
          message={signUpState.message}
          type={signUpState.status === "failure" ? "error" : "info"}
        />
      </form>
    </Fragment>
  );
};

export default SignUp;
