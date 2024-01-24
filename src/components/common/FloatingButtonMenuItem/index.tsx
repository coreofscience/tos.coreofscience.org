import { FC } from "react";
import { FloatingButtonMenuItemPropsType } from "./types";

const FloatingButtonMenuItem: FC<FloatingButtonMenuItemPropsType> = (props) => (
  <div className="relative flex items-center justify-center">
    {props.name && (
      <p className="absolute right-10 min-w-max text-center text-[0.7rem]">
        {props.name}
      </p>
    )}
    <button
      onClick={props.action}
      className="self-center rounded-full bg-leaf px-2 py-2 shadow-sm hover:shadow-md active:shadow-md"
      {...props.attributes}
    >
      <div className="flex h-5 w-5 items-center justify-center">
        {props.icon}
      </div>
    </button>
  </div>
);

export default FloatingButtonMenuItem;
