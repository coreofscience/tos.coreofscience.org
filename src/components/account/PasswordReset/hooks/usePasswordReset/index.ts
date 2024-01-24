import useFirebase from "../../../../../hooks/useFirebase";
import { AsyncActionStateType } from "../../../../../types/asyncActionStateType";
import { PaswordResetFormFieldsType } from "../../types";
import { PasswordResetActionsType } from "./types";
import { sendPasswordResetEmail } from "firebase/auth";
import { useCallback, useState } from "react";

export const usePasswordReset = (): [
  AsyncActionStateType,
  PasswordResetActionsType,
] => {
  const firebase = useFirebase();
  const [state, setState] = useState<AsyncActionStateType>({
    status: "idle",
    message: "",
  });

  const sendEmail = useCallback(
    (data: PaswordResetFormFieldsType) => {
      setState({ status: "in-progress", message: "" });
      sendPasswordResetEmail(firebase.auth, data.email)
        .then(() => {
          setState({
            status: "success",
            message: "Password reset email sent successfuly.",
          });
        })
        .catch(() => {
          setState({
            status: "failure",
            message: "There was an issue sending your passrord reset email",
          });
        });
    },
    [firebase.auth],
  );

  return [state, { sendEmail }];
};
