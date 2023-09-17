import { createRoot } from "react-dom/client";

import Toast from "../Toast";

import { toastContainerId } from "./constants";

export interface Props {
  title: string;
  duration: number;
  status: "info" | "warning" | "error";
  description?: string;
}

export default (props: Props) => {
  let container = document.getElementById(toastContainerId) as Element;

  if (!container) {
    container = document.createElement("div");
    container.setAttribute("id", toastContainerId);
    document.body.appendChild(container);
  }

  const root = createRoot(container);
  root.render(<Toast {...props} root={root} />);
};
