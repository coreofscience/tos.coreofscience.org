import React, { useEffect, useRef, FC } from "react";

import hideToast from "./hideToast";

import { ToastProperties } from "../../../types/toastType";

import { toastTimeMs } from "./constants";

import "./styles.css";

const Toast: FC<ToastProperties> = (props) => {
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
      className={`toast ${props.status}`}
    >
      <p className="toast__title">{props.title}</p>
      {props.description ? (
        <p className="toast__description">{props.description}</p>
      ) : (
        ""
      )}
    </output>
  );
};

Toast.defaultProps = {
  duration: toastTimeMs,
};

export default Toast;
