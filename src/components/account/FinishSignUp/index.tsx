import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  isSignInWithEmailLink,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signUpSchema } from "./schema";
import { defaultSignUpFormFieldsState } from "./constants/defaultState";

import { SignUpFormFieldsType } from "./types";

import "../common/styles.css";
import TreeOfScience from "../../vectors/TreeOfScience";
import { InputErrorMsg } from "../common/InputErrorMsg";
import useFirebase from "../../../hooks/useFirebase";
import { useNavigate } from "react-router-dom";

type FinishSignUpStatusType =
  | "idle"
  | "validatingUrl"
  | "validUrl"
  | "invalidUrl"
  | "signingUp"
  | "signedUp"
  | "signUpFail";

const authLinkStatusMessageMap: {
  [k in FinishSignUpStatusType]: string | undefined;
} = {
  idle: "We are verifying some information for you...",
  validatingUrl: "We are verifying some information for you...",
  validUrl: "",
  invalidUrl:
    "Invalid authentication validation url, ensure you are opening the proper link we've sent to your email.",
  signingUp: "Signing up...",
  signedUp:
    "Successfully signed up, you will be redirected to home in a few...",
  signUpFail: "There was an error trying to sign up, please try again.",
};

const FinishSignUp: FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<FinishSignUpStatusType>("idle");

  const firebase = useFirebase();

  const { setValue, handleSubmit, register, formState } =
    useForm<SignUpFormFieldsType>({
      defaultValues: defaultSignUpFormFieldsState,
      resolver: yupResolver(signUpSchema),
      reValidateMode: "onSubmit",
      mode: "onSubmit",
    });

  useEffect(() => {
    setStatus("validatingUrl");
    if (isSignInWithEmailLink(firebase.auth, window.location.href)) {
      const params = new URLSearchParams(window.location.search);
      const email = params.get("email");
      if (email) {
        setValue("email", decodeURIComponent(email));
        setStatus("validUrl");
        return;
      }
    }
    setStatus("invalidUrl");
  }, [firebase.auth, setValue]);

  const onSignUpSubmit = useCallback(
    (data: SignUpFormFieldsType) => {
      setStatus("signingUp");
      createUserWithEmailAndPassword(firebase.auth, data.email, data.password)
        .then(() => {
          setStatus("signedUp");
          setTimeout(() => navigate("/"), 500);
        })
        .catch(() => {
          setStatus("signUpFail");
        });
    },
    [firebase.auth, navigate]
  );

  if (["idle", "validatingUrl", "invalidUrl"].includes(status))
    return <p>{authLinkStatusMessageMap[status]}</p>;

  return (
    <Fragment>
      <div className="container">
        <form className="content" onSubmit={handleSubmit(onSignUpSubmit)}>
          <TreeOfScience className="content-logo" />
          <h2>Sign Up</h2>
          <input {...register("name")} type="text" placeholder="Name" />
          <input {...register("email")} type="text" placeholder="E-mail" />
          <InputErrorMsg message={formState.errors.email?.message} />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          <InputErrorMsg message={formState.errors.password?.message} />
          <br />
          <input
            type="submit"
            className="btn btn-large btn-leaf"
            value="SIGN UP"
          />
          {["signingUp", "signedUp", "signUpFail"].includes(status) ? (
            <p>{authLinkStatusMessageMap[status]}</p>
          ) : null}
        </form>
      </div>
    </Fragment>
  );
};

export default FinishSignUp;
