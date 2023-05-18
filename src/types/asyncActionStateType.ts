export type AsyncActionStateType = {
  status: "idle" | "in-progress" | "failure" | "success";
  message: string;
};
