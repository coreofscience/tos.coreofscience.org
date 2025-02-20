import { FC, ReactNode } from "react";

type FloatingButtonMenuItemPropsType = {
  icon: ReactNode;
  action: () => void;
  attributes: {
    "arial-label": string;
    title: string;
  };
  name?: string;
};

const FloatingButtonMenuItem: FC<FloatingButtonMenuItemPropsType> = ({
  name,
  action,
  attributes,
  icon,
}) => (
  <div className="relative flex items-center justify-center">
    {name && (
      <p className="absolute right-10 min-w-max text-center text-[0.7rem]">
        {name}
      </p>
    )}
    <button
      onClick={action}
      className="bg-leaf self-center rounded-full px-2 py-2 shadow-xs hover:shadow-md active:shadow-md"
      {...attributes}
    >
      <div className="flex h-5 w-5 items-center justify-center">{icon}</div>
    </button>
  </div>
);

export default FloatingButtonMenuItem;
