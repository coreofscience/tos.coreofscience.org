import useFirebase from "../../../hooks/useFirebase";
import Button from "../../ui/Button";
import { sendEmailVerification } from "firebase/auth";
import { FC, useState } from "react";

const EmailVerification: FC = () => {
  const firebase = useFirebase();
  const [hidden, setHidden] = useState<boolean>(false);

  const handle = () => {
    const currentUser = firebase.auth.currentUser;
    if (currentUser) sendEmailVerification(currentUser);
  };

  return !hidden ? (
    <div className="flex flex-col gap-2 px-8 py-4 rounded-sm border-2 border-leaf">
      <p>
        Please verify your email.&nbsp;
        <Button variant="link" size="link" onClick={handle}>
          Resend email
        </Button>
        . &nbsp;
        <Button variant="link" size="link" onClick={() => setHidden(true)}>
          I already verified my email
        </Button>
        .
      </p>
    </div>
  ) : (
    <></>
  );
};

export default EmailVerification;
