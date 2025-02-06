import useFirebase from "../../../hooks/useFirebase";
import { UserContextType } from "../../../types/userContextType";
import Button from "../../ui/Button";
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
    <div className="flex flex-col gap-2 rounded-sm px-8 py-4 border-leaf border-2">
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
