import { ReactNode } from "react";

export type FloatingButtonMenuItemPropsType = {
  icon: ReactNode;
  action: () => void;
  attributes: {
    "arial-label": string;
    title: string;
  };
  name?: string;
};
