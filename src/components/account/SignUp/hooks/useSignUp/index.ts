import { useCallback, useState } from "react";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  sendEmailVerification,
  User,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

import useFirebase from "../../../../../hooks/useFirebase";

import { SignUpFormFieldsType } from "../../types";
import { SignUpActionsType } from "./types";
import { AsyncActionStateType } from "../../../../../types/asyncActionStateType";

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

          setDoc(
            doc(firebase.firestore, `/users/${userCredential.user.uid}`),
            {
              acceptsEmail: data.acceptsEmail,
            },
            { merge: true },
          ).then(() => {
            setDoc(
              doc(firebase.firestore, "plans", userCredential.user.uid),
              {},
            );
          });

          updateProfile(userCredential.user, {
            displayName: data.name,
          });

          setTimeout(() => {
            navigate("/tos");
            const user: User = userCredential.user;
            if (user) sendEmailVerification(user);
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
    [firebase.auth, firebase.firestore, navigate],
  );

  return [state, { signUp }];
};
