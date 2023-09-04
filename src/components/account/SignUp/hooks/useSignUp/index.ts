import { useCallback, useState } from "react";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  sendEmailVerification,
  User
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import useFirebase from "../../../../../hooks/useFirebase";

import { SignUpFormFieldsType } from "../../types";
import { SignUpActionsType } from "./types";
import { AsyncActionStateType } from "../../../../../types/asyncActionStateType";

import showToast from "../../../../common/Toast/showToast";

export const useSignUp = (): [AsyncActionStateType, SignUpActionsType] => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [state, setState] = useState<AsyncActionStateType>({
    status: "idle",
    message: "",
  });

  const signUp = useCallback(
    (data: SignUpFormFieldsType) => {
      setState({
        status: "in-progress",
        message: "Creating account...",
      });
      createUserWithEmailAndPassword(firebase.auth, data.email, data.password)
        .then((userCredential: UserCredential) => {
          setState({
            status: "success",
            message:
              "Successfully signed up, you will be redirected to home in a few...",
          });
          setTimeout(() => {
            navigate("/")
            const user: User = userCredential.user
            if (user) sendEmailVerification(user)
              .then(() => {
                showToast({
                  title: "Verification email sent",
                  description: "A verification email has been sent to the email address you registered with.",
                  duration: 4000,
                  status: "info",
                })
              })
              .catch(() => {
                showToast({
                  title: "Error sending verification email",
                  description: "An error occurred while sending the verification email to the email address you registered with.",
                  duration: 4000,
                  status: "warning",
                })
              })
          }, 500);
        })
        .catch((error) => {
          setState({
            status: "failure",
            message:
              error.code === "auth/email-already-in-use"
                ? "An account already exists with the email you entered"
                : "There was an error creating your account, please try again",
          });
        });
    },
    [firebase.auth, navigate]
  );

  return [state, { signUp }];
};
