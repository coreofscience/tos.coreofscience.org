import { createRoot } from "react-dom/client";

import { ShowToastProperties } from "../../../types/toastType";

import Toast from "../Toast";

import { toastContainerId } from "./constants";

export default (props: ShowToastProperties) => {
  let container = document.getElementById(toastContainerId) as Element;

  if (!container) {
    container = document.createElement("div");
    container.setAttribute("id", toastContainerId);
    document.body.appendChild(container);
  }

  const root = createRoot(container);
  root.render(<Toast {...props} root={root} />);
};
