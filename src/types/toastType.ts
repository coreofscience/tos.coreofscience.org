import { Root } from "react-dom/client";

export interface ShowToastProperties {
  title: string;
  duration: number;
  status: "info" | "warning" | "error";
  description?: string;
}

export interface ToastProperties extends ShowToastProperties {
  root: Root;
}
