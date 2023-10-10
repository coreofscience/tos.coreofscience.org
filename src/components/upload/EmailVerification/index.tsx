import React from "react"

const EmailVerification = () => {

 const handle = () => {
  console.log("Resend email");
 }

 return (
  <div className="flex flex-col gap-2 p-4 text-slate-50 bg-leaf">
   <p>
    Please verify your email.
   </p>
   <div className="flex flex-row gap-2">
    <button
     onClick={handle}
     className="px-4 py-2 font-tall uppercase font-bold bg-slate-50 text-leaf"
    >
     Resend email
    </button>
   </div>
  </div>
 );
};

export default EmailVerification;
