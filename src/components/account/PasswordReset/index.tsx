import { FC, Fragment } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Message } from "../common/Message";

import { defaultLoginFormFieldsState } from "./constants/defaultState";
import { passwordResetSchema } from "./schema";
import { usePasswordReset } from "./hooks/usePasswordReset";

import { PaswordResetFormFieldsType } from "./types";

const PasswordReset: FC = () => {
  const form = useForm<PaswordResetFormFieldsType>({
    defaultValues: defaultLoginFormFieldsState,
    resolver: yupResolver(passwordResetSchema),
  });

  const [passwordResetState, passwordResetActions] = usePasswordReset();

  return (
    <Fragment>
      <form
        className="form-content"
        onSubmit={form.handleSubmit(passwordResetActions.sendEmail)}
      >
        <h2>Reset passrword</h2>
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
        <br />
        <input type="submit" className="btn btn-large btn-leaf" value="SEND" />
        <Message
          message={passwordResetState.message}
          type={passwordResetState.status === "failure" ? "error" : "info"}
        />
      </form>
    </Fragment>
  );
};

export default PasswordReset;
