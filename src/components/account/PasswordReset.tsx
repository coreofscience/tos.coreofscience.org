import useFirebase from "../../hooks/useFirebase";
import { AsyncActionStateType } from "../../types/asyncActionStateType";
import { Message } from "../common/Message";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendPasswordResetEmail } from "firebase/auth";
import { FC, Fragment, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

type PaswordResetFormFieldsType = {
  email: string;
};

const passwordResetSchema = object()
  .shape({
    email: string().required().email("Invalid email address"),
  })
  .required();

type PasswordResetActionsType = {
  sendEmail: (data: PaswordResetFormFieldsType) => void;
};

const usePasswordReset = (): [
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

const PasswordReset: FC = () => {
  const form = useForm<PaswordResetFormFieldsType>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(passwordResetSchema),
  });

  const [passwordResetState, passwordResetActions] = usePasswordReset();

  return (
    <Fragment>
      <form
        className="m-auto flex max-w-md flex-col gap-4"
        onSubmit={form.handleSubmit(passwordResetActions.sendEmail)}
      >
        <h2 className="font-tall text-2xl uppercase md:text-4xl">
          Reset your passrword
        </h2>
        <div className="flex flex-col gap-2">
          <input
            {...form.register("email")}
            type="email"
            className="border border-stone-500 p-2"
            placeholder="email@example.com"
          />
          <Message
            message={form.formState.errors.email?.message}
            type="error"
          />
        </div>
        <div>
          <input
            type="submit"
            className="bg-leaf px-4 py-2 font-tall font-bold uppercase text-slate-50"
            value="SEND"
          />
        </div>
        <Message
          message={passwordResetState.message}
          type={passwordResetState.status === "failure" ? "error" : "info"}
        />
      </form>
    </Fragment>
  );
};

export default PasswordReset;
