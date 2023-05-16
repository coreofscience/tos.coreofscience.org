import React, { FC, Fragment, useCallback, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signUpSchema } from "./schema";
import { defaultSignUpFormFieldsState } from "./constants/defaultState";

import { SignUpFormFieldsType } from "./types";

import "../common/styles.css";
import TreeOfScience from "../../vectors/TreeOfScience";
import useFirebase from "../../../hooks/useFirebase";
import { TextInput } from "../common/TextInput";

type AuthLinkStatusType = "idle" | "creating" | "success" | "error";

const authLinkStatusMessageMap: {
  [k in AuthLinkStatusType]: string | undefined;
} = {
  idle: "",
  creating: "Creating account.",
  success: "Successfully signed up, you will be redirected to home in a few...",
  error: "There was an error sending an authentication link, please try again.",
};

const SignUp: FC = () => {
  const [signUpStatus, setSignUpStatus] = useState<AuthLinkStatusType>("idle");
  const firebase = useFirebase();

  const form = useForm<SignUpFormFieldsType>({
    defaultValues: defaultSignUpFormFieldsState,
    resolver: yupResolver(signUpSchema),
  });

  const onSignUpSubmit = useCallback(
    (data: SignUpFormFieldsType) => {
      setSignUpStatus("creating");
      createUserWithEmailAndPassword(firebase.auth, data.email, data.password)
        .then(() => {
          setSignUpStatus("success");
        })
        .catch((error) => {
          setSignUpStatus("error");
          throw error;
        });
    },
    [firebase.auth]
  );

  return (
    <Fragment>
      <div className="container">
        <form
          className="form-content"
          onSubmit={form.handleSubmit(onSignUpSubmit)}
        >
          <TreeOfScience className="content-logo" />
          <h2>Sign Up</h2>
          <TextInput
            {...form.register("name")}
            type="text"
            placeholder="Name"
            errorMessage={form.formState.errors.name?.message}
          />
          <TextInput
            {...form.register("email")}
            type="text"
            placeholder="E-mail"
            errorMessage={form.formState.errors.email?.message}
          />
          <TextInput
            {...form.register("password")}
            type="password"
            placeholder="Password"
            errorMessage={form.formState.errors.password?.message}
          />
          <br />
          <input
            type="submit"
            className="btn btn-large btn-leaf"
            value="SIGN UP"
          />
          {authLinkStatusMessageMap[signUpStatus] ? (
            <p>{authLinkStatusMessageMap[signUpStatus]}</p>
          ) : null}
        </form>
      </div>
    </Fragment>
  );
};

export default SignUp;
