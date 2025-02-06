import useFirebase from "../../../hooks/useFirebase";
import useNext from "../../../hooks/useNext";
import useUser from "../../../hooks/useUser";
import Button from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { User, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const sendVerificationEmail = async ({ user }: { user: User | null }) => {
  if (user) await sendEmailVerification(user, { url: window.location.href });
};

const VerifyEmail = () => {
  const firebase = useFirebase();
  const user = useUser();
  const { next, nextSearch } = useNext();
  const [disabled, setDisabled] = useState<boolean>(false);

  const resendMutation = useMutation({
    mutationFn: sendVerificationEmail,
    onSuccess: () => setDisabled(true),
  });

  if (!user) {
    return (
      <Navigate
        to={{
          pathname: "/log-in",
          search: `?next=${encodeURIComponent(`/account/verify${nextSearch}`)}`,
        }}
      />
    );
  }

  if (user.emailVerified) {
    return <Navigate to={next || "/tos"} />;
  }

  return (
    <div className="flex flex-col gap-24">
      <div className="flex justify-center">
        <h2 className="text-center font-bold font-tall text-5xl sm:text-7xl">
          Please verify your email
        </h2>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <p className="text-center text-lg">
          We've sent you an email with a link to verify your email address.
        </p>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <Button
          className="uppercase"
          onClick={() =>
            resendMutation.mutate({ user: firebase.auth.currentUser })
          }
          disabled={resendMutation.isPending || disabled}
        >
          Resend email
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
