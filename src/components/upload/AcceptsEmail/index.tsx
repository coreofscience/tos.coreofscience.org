import React from "react";
import { setDoc, doc } from "firebase/firestore";

import useFirebase from "../../../hooks/useFirebase";
import { UserContextType } from "../../../types/userContextType";

type Props = {
 user: UserContextType;
};

const AcceptsEmail = ({ user }: Props) => {
 const firebase = useFirebase();

 const handleAccept = () => {
  setDoc(doc(firebase.firestore, `/users/${user.uid}`), {
   acceptsEmail: true,
  })
   .then(() => {
    const container = document.getElementById("container-of-the-accepts-email");
    container?.classList.add("hidden");
   });
 }

 const handleDismiss = () => {
  setDoc(doc(firebase.firestore, `/users/${user.uid}`), {
   acceptsEmail: false,
  })
   .then(() => {
    const container = document.getElementById("container-of-the-accepts-email");
    container?.classList.add("hidden");
   });
 }

 return (
  user.acceptsEmail == null ? (
   <div className="max-w-2xl" id="container-of-the-accepts-email" >
    <div className="px-4 py-2 font-tall text-slate-50 bg-leaf">
     <p className="mb-2">I like to receive the Tree of Science newsletter to stay in touch and
      to learn about latest trends on literature searches and new
      product features first.</p>
     <button onClick={handleAccept} className="mr-1 px-3 py-1 font-tall uppercase font-bold text-slate-50 bg-leaf">Accept</button>
     <button onClick={handleDismiss} className="px-3 py-1 font-tall uppercase font-bold text-slate-50 bg-trunk">Dismiss</button>
    </div>
   </div>
  ) : <></>
 );
};

export default AcceptsEmail;
