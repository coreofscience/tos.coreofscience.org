import { StateType } from "./types";

export const getInitialState = (): StateType => ({
  page: 0,
  data: [],
  status: "idle",
  hasMore: true,
  error: undefined,
});
