import { useEffect, useRef, FC } from "react";
import { Root } from "react-dom/client";

import hideToast from "./hideToast";

import { toastTimeMs } from "./constants";

export interface Props {
  title: string;
  duration: number;
  status: "info" | "warning" | "error";
  description?: string;
  root: Root;
}

const Toast: FC<Props> = (props) => {
  const toast = useRef<HTMLOutputElement>(null);
  let timer: NodeJS.Timeout = setTimeout(() => {}, -1);

  const onReset = () => {
    clearTimeout(timer);
  };

  const onStart = () => {
    timer = setTimeout(() => {
      hideToast(props.root);
    }, props.duration);
  };

  useEffect(() => {
    onStart();
    toast.current?.focus();
  }, []);

  return (
    <output
      ref={toast}
      aria-labelledby="toast-label"
      onMouseEnter={onReset}
      onMouseLeave={onStart}
      className={
        "fixed left-[50%] bottom-4 translate-x-[-50%] translate-y-[-15%] max-w-md p-4 flex flex-col gap-2 content-start items-center text-center text-slate-50 animate-slide-up z-10 will-change-transform " +
        (props.status === "info"
          ? "bg-leaf"
          : props.status === "error"
          ? "bg-red-500"
          : /* warning */ "bg-root")
      }
    >
      <p className="font-bold">{props.title}</p>
      {props.description ? <p>{props.description}</p> : ""}
    </output>
  );
};

Toast.defaultProps = {
  duration: toastTimeMs,
};

export default Toast;
