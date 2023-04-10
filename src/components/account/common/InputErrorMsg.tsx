import React, { FC } from "react";

export const InputErrorMsg: FC<{ message: string | undefined }> = ({
  message,
}) => {
  if (!message) return null;

  return <span>{message}</span>;
};
