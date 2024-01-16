import { FC } from "react";

type Props = {
  textColor: string;
};

const CheckCircleIcon: FC<Props> = ({ textColor }: Props) => {
  return (
    <svg
      aria-hidden="true"
      className={`h-6 w-6 flex-none fill-current stroke-current ${textColor}`}
    >
      <path d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"></path>
      <circle
        cx="12"
        cy="12"
        r="8.25"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></circle>
    </svg>
  );
};

export default CheckCircleIcon;
