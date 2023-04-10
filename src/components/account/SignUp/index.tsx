import React, { FC, Fragment, useCallback, useState } from "react";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signUpSchema } from "./schema";
import { defaultSignUpFormFieldsState } from "./constants/defaultState";

import { SignUpFormFieldsType } from "./types";

import "../common/styles.css";
import TreeOfScience from "../../vectors/TreeOfScience";
import useFirebase from "../../../hooks/useFirebase";
import { InputErrorMsg } from "../common/InputErrorMsg";

type AuthLinkStatusType = "idle" | "sending" | "sent" | "error";

const authLinkStatusMessageMap: {
  [k in AuthLinkStatusType]: string | undefined;
} = {
  idle: "",
  sending: "Sending authentication link to your account...",
  sent: "We've sent an authentication link to your account.",
  error: "There was an error sending an authentication link, please try again.",
};

const SignUp: FC = () => {
  const [signUpLinkStatus, setSignUpLinkStatus] =
    useState<AuthLinkStatusType>("idle");
  const firebase = useFirebase();

  const form = useForm<SignUpFormFieldsType>({
    defaultValues: defaultSignUpFormFieldsState,
    resolver: yupResolver(signUpSchema),
    reValidateMode: "onSubmit",
    mode: "onSubmit",
  });

  const onSignUpSubmit = useCallback(
    (data: SignUpFormFieldsType) => {
      setSignUpLinkStatus("sending");
      const url = `${
        window.location.origin
      }/finish-sign-up?email=${encodeURIComponent(data.email)}`;
      const settings = { url, handleCodeInApp: true };
      sendSignInLinkToEmail(firebase.auth, data.email, settings)
        .then(() => {
          setSignUpLinkStatus("sent");
        })
        .catch((error) => {
          setSignUpLinkStatus("error");
          throw error;
        });
    },
    [firebase.auth]
  );

  return (
    <Fragment>
      <div className="container">
        <form className="content" onSubmit={form.handleSubmit(onSignUpSubmit)}>
          <TreeOfScience className="content-logo" />
          <h2>Sign Up</h2>
          <input {...form.register("email")} type="text" placeholder="E-mail" />
          <InputErrorMsg message={form.formState.errors.email?.message} />
          <br />
          <input
            type="submit"
            className="btn btn-large btn-leaf"
            value="SIGN UP"
          />
          {authLinkStatusMessageMap[signUpLinkStatus] ? (
            <p>{authLinkStatusMessageMap[signUpLinkStatus]}</p>
          ) : null}
        </form>
      </div>
    </Fragment>
  );
};

export default SignUp;
