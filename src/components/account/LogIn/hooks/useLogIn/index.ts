import useFirebase from "../../../../../hooks/useFirebase";
import { AsyncActionStateType } from "../../../../../types/asyncActionStateType";
import { LogInFormFieldsType } from "../../types";
import { LogInActionsType } from "./types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const messageByErrorCodeMap: Record<string, string> = {
  "auth/user-not-found": "Couldn't find your account",
  "auth/wrong-password":
    "Unable to log in, please be sure to use the proper email/password",
};

export const useSignIn = (): [AsyncActionStateType, LogInActionsType] => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [state, setState] = useState<AsyncActionStateType>({
    status: "idle",
    message: "",
  });

  const logIn = useCallback(
    (data: LogInFormFieldsType) => {
      signInWithEmailAndPassword(firebase.auth, data.email, data.password)
        .then(() => {
          setState({ status: "success", message: "Successfully logged in" });
          navigate("/tos");
        })
        .catch((error) => {
          setState({
            status: "failure",
            message:
              messageByErrorCodeMap[error.code] ??
              "There was an error loggin in to your account, please try again",
          });
        });
    },
    [firebase.auth, navigate],
  );

  return [state, { logIn }];
};
