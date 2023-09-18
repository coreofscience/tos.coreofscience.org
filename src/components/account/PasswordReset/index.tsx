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
        className="flex flex-col gap-4 max-w-md m-auto"
        onSubmit={form.handleSubmit(passwordResetActions.sendEmail)}
      >
        <h2 className="text-2xl md:text-4xl font-tall uppercase">
          Reset your passrword
        </h2>
        <div className="flex flex-col gap-2">
          <input
            {...form.register("email")}
            type="email"
            className="p-2 border border-stone-500"
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
            className="px-4 py-2 font-tall uppercase font-bold text-slate-50 bg-leaf"
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
