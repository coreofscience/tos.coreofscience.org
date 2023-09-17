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
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(signUpActions.signUp)}
      >
        <h2 className="text-2xl md:text-4xl font-tall uppercase">Sign Up</h2>
        <div className="flex flex-col gap-2">
          <input
            {...form.register("name")}
            type="text"
            className="p-2 border border-stone-500"
            placeholder="Name"
          />
          <Message message={form.formState.errors.name?.message} type="error" />
        </div>
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
