import useFirebase from "../../hooks/useFirebase";
import { UserContextType } from "../../types/userContextType";
import Button from "../ui/Button";
import { setDoc, doc } from "firebase/firestore";

type AcceptsEmailProps = {
  user: UserContextType;
};

const AcceptsEmail = ({ user }: AcceptsEmailProps) => {
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
    <div className="border-leaf flex flex-col gap-2 rounded-xs border-2 px-8 py-4">
      <p>
        I like to receive the Tree of Science newsletter to stay in touch and to
        learn about latest trends on literature searches and new product
        features first.
      </p>
      <div className="flex flex-row gap-2">
        <Button variant="outline" className="uppercase" onClick={handleDismiss}>
          Dismiss
        </Button>
        <Button className="uppercase" onClick={handleAccept}>
          Accept
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AcceptsEmail;
