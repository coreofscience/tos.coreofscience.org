import React, { FC } from "react";
import { Message } from "./Message";

export const TextInput: FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    errorMessage: string | undefined;
  }
> = (props) => {
  const { errorMessage, ...rest } = props;
  return (
    <div className="form-input">
      <input {...rest} />
      <Message message={errorMessage} type="error" />
    </div>
  );
};
