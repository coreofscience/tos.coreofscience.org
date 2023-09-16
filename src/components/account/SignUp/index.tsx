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
        className="form-content"
        onSubmit={form.handleSubmit(signUpActions.signUp)}
      >
        <h2>Sign Up</h2>
        <div className="form-input">
          <input {...form.register("name")} type="text" placeholder="Name" />
          <Message message={form.formState.errors.name?.message} type="error" />
        </div>
        <div className="form-input">
          <input
            {...form.register("email")}
            type="email"
            placeholder="email@example.com"
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
            placeholder="password"
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
          value="SIGN UP"
        />
        <Message
          message={signUpState.message}
          type={signUpState.status === "failure" ? "error" : "info"}
        />
      </form>
    </Fragment>
  );
};

export default SignUp;
