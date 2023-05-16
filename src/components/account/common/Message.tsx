import React, { FC } from "react";

export const Message: FC<{
  message: string | undefined;
  type: "info" | "error";
}> = ({ message, type }) => {
  if (!message) return null;

  if (type === "error")
    return <span className="form-input-error">{message}</span>;

  if (type === "info")
    return <span className="form-input-info">{message}</span>;

  return null;
};
