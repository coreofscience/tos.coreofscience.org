import React, { FC } from "react";

export const Message: FC<{
  message: string | undefined;
  type: "info" | "error";
}> = ({ message, type }) => {
  if (!message) return null;

  if (type === "error") return <span className="error-message">{message}</span>;

  if (type === "info") return <span className="info-message">{message}</span>;

  return null;
};
