import { FC } from "react";
import { FloatingButtonMenuItemPropsType } from "./types";

const FloatingButtonMenuItem: FC<FloatingButtonMenuItemPropsType> = (props) => (
  <div className="flex justify-center items-center relative">
    {props.name && (
      <p className="text-[0.7rem] text-center min-w-max absolute right-10">
        {props.name}
      </p>
    )}
    <button
      onClick={props.action}
      className="px-2 py-2 bg-leaf self-center rounded-full shadow-sm hover:shadow-md active:shadow-md"
      {...props.attributes}
    >
      <div className="w-5 h-5 flex justify-center items-center">
        {props.icon}
      </div>
    </button>
  </div>
);

export default FloatingButtonMenuItem;
