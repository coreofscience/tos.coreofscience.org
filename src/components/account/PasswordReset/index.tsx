import { Message } from "../common/Message";
import { defaultLoginFormFieldsState } from "./constants/defaultState";
import { usePasswordReset } from "./hooks/usePasswordReset";
import { passwordResetSchema } from "./schema";
import { PaswordResetFormFieldsType } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, Fragment } from "react";
import { useForm } from "react-hook-form";

const PasswordReset: FC = () => {
  const form = useForm<PaswordResetFormFieldsType>({
    defaultValues: defaultLoginFormFieldsState,
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
