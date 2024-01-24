import { FloatingButtonMenuPropsType } from "./types";
import React, { useState } from "react";

const FloatingButtonMenu: React.FC<FloatingButtonMenuPropsType> = ({
  children,
  iconResting,
  iconActive,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-2">
      {isOpen && children && (
        <div className="flex flex-col items-center justify-start gap-1.5">
          {children}
        </div>
      )}

      <button
        className="self-center rounded-full bg-leaf px-5 py-5 shadow-sm hover:shadow-md active:shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen ? iconActive : iconResting}
      </button>
    </div>
  );
};

export default FloatingButtonMenu;
