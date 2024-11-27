import { FC } from "react";

export const Message: FC<{
  message: string | undefined;
  type: "info" | "error";
}> = ({ message, type }) => {
  if (!message) return null;

  if (type === "error") return <span className="text-red-500">{message}</span>;

  if (type === "info") return <span className="text-leaf">{message}</span>;

  return null;
};
