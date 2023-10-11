import React, { FC } from "react";
import { sendEmailVerification } from "firebase/auth";
import useFirebase from "../../../hooks/useFirebase";

const EmailVerification: FC = () => {
 const firebase = useFirebase();

 const handle = () => {
  const currentUser = firebase.auth.currentUser
  if (currentUser) sendEmailVerification(currentUser)
 }

 return (
  <div className="flex flex-col gap-2 p-4 text-slate-50 bg-leaf">
   <p>
    Please verify your email.&nbsp;
    <a
     onClick={handle}
     className="underline text-slate-50 hover:text-slate-200 cursor-pointer"
    >
     Resend email
    </a>
   </p>
  </div>
 );
};

export default EmailVerification;
