import { FC, useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import useFirebase from "../../../hooks/useFirebase";

const EmailVerification: FC = () => {
  const firebase = useFirebase();
  const [hidden, setHidden] = useState<boolean>(false);

  const handle = () => {
    const currentUser = firebase.auth.currentUser;
    if (currentUser) sendEmailVerification(currentUser);
  };

  return !hidden ? (
    <div className="flex flex-col gap-2 bg-leaf p-4 text-slate-50">
      <p>
        Please verify your email.&nbsp;
        <span
          onClick={handle}
          className="cursor-pointer text-slate-50 underline hover:text-slate-200"
        >
          Resend email
        </span>
        . &nbsp;
        <span
          onClick={() => setHidden(true)}
          className="cursor-pointer text-slate-50 underline hover:text-slate-200"
        >
          I already verified my email
        </span>
        .
      </p>
    </div>
  ) : (
    <></>
  );
};

export default EmailVerification;
