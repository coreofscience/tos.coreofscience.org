import useFirebase from "../../hooks/useFirebase";
import Button from "../ui/Button";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";

const EmailVerification = () => {
  const firebase = useFirebase();
  const [hidden, setHidden] = useState<boolean>(false);

  const handle = () => {
    const currentUser = firebase.auth.currentUser;
    if (currentUser) sendEmailVerification(currentUser);
  };

  return !hidden ? (
    <div className="flex flex-col gap-2 rounded-sm border-2 border-leaf px-8 py-4">
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
