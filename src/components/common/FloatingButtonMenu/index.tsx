import React, { useState } from "react";

import { FloatingButtonMenuPropsType } from "./types";

const FloatingButtonMenu: React.FC<FloatingButtonMenuPropsType> = ({
  children,
  iconResting,
  iconActive,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2 fixed bottom-10 right-10">
      {isOpen && children && (
        <div className="flex flex-col justify-start items-center gap-1.5">
          {children}
        </div>
      )}

      <button
        className="px-5 py-5 self-center bg-leaf rounded-full shadow-sm hover:shadow-md active:shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen ? iconActive : iconResting}
      </button>
    </div>
  );
};

export default FloatingButtonMenu;
