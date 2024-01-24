import useFirebase from "../../../hooks/useFirebase";
import { UserContextType } from "../../../types/userContextType";
import { setDoc, doc } from "firebase/firestore";

type Props = {
  user: UserContextType;
};

const AcceptsEmail = ({ user }: Props) => {
  const firebase = useFirebase();

  const handleAccept = () => {
    setDoc(
      doc(firebase.firestore, `/users/${user.uid}`),
      {
        acceptsEmail: true,
      },
      { merge: true },
    );
  };

  const handleDismiss = () => {
    setDoc(
      doc(firebase.firestore, `/users/${user.uid}`),
      {
        acceptsEmail: false,
      },
      { merge: true },
    );
  };

  return user.acceptsEmail === undefined ? (
    <div className="flex flex-col gap-2 rounded-sm bg-leaf p-4 text-slate-50">
      <p>
        I like to receive the Tree of Science newsletter to stay in touch and to
        learn about latest trends on literature searches and new product
        features first.
      </p>
      <div className="flex flex-row gap-2">
        <button
          onClick={handleDismiss}
          className="rounded-sm px-4 py-2 font-tall font-bold uppercase text-slate-50 ring-1 ring-slate-50"
        >
          Dismiss
        </button>
        <button
          onClick={handleAccept}
          className="rounded-sm bg-slate-50 px-4 py-2 font-tall font-bold uppercase text-leaf"
        >
          Accept
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AcceptsEmail;
