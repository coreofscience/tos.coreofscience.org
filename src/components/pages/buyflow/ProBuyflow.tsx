import useFirebase from "../../../hooks/useFirebase";
import useUser from "../../../hooks/useUser";
import { Message } from "../../common/Message";
import { useMutation } from "@tanstack/react-query";
import { Firestore, doc, setDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

type SubscriptionPerios = "monthly" | "yearly";

type Subscription = {
  period: SubscriptionPerios;
  price_usc: number;
};

const subscribe = async ({
  firestore,
  userId,
  subscription,
}: {
  firestore: Firestore;
  userId: string;
  subscription: Subscription;
}) => {
  // Create a new subscription document
  await setDoc(doc(firestore, `/subscriptions/${userId}`), {
    period: subscription.period,
    price_usc: subscription.price_usc,
    start_date: new Date(),
  });
};

const ProBuyflow = () => {
  const user = useUser();
  const navigate = useNavigate();
  const firebase = useFirebase();
  const subscribeMutation = useMutation({
    mutationFn: subscribe,
    onSuccess: () => {
      // Redirect to the thanks page
      setTimeout(() => {
        navigate("/buy/pro/thanks");
      }, 500);
    },
  });

  if (!user) {
    return (
      <Navigate
        to={{
          pathname: "/log-in",
          search: `?next=${encodeURIComponent("/buy/pro")}`,
        }}
      />
    );
  }
  return (
    <div className="flex flex-col gap-24">
      <div className="flex justify-center">
        <h2 className="text-center font-bold font-tall text-5xl sm:text-7xl">
          Get Tree of Science Pro
        </h2>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <div>
          <p>With Tree of Science Pro you get:</p>
          <ul className="list-disc list-inside">
            <li>Upload files up to 100MB</li>
            <li>Unlimited history</li>
          </ul>
          <p>For just $10/month or $100/year</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <button
          className="rounded-sm bg-leaf px-4 py-2 text-center font-tall font-bold uppercase text-slate-50"
          onClick={() =>
            subscribeMutation.mutate({
              firestore: firebase.firestore,
              userId: user.uid,
              subscription: {
                period: "monthly",
                // Will create the subscriptions with price 0 for now
                price_usc: 0,
              },
            })
          }
        >
          Buy Montly Subscription ($10/month)
        </button>
        <button
          className="rounded-sm bg-leaf px-4 py-2 text-center font-tall font-bold uppercase text-slate-50"
          onClick={() =>
            subscribeMutation.mutate({
              firestore: firebase.firestore,
              userId: user.uid,
              subscription: {
                period: "yearly",
                // Will create the subscriptions with price 0 for now
                price_usc: 0,
              },
            })
          }
        >
          Buy Annual Subscription ($100/year)
        </button>
      </div>
      <Message
        message={
          subscribeMutation.isError
            ? "There was an error creating your subscription"
            : subscribeMutation.isSuccess
              ? "Successfully created your subscription!"
              : ""
        }
        type={subscribeMutation.isError ? "error" : "info"}
      />
    </div>
  );
};

export default ProBuyflow;
