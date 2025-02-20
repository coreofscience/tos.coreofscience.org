import useFirebase from "../../../hooks/useFirebase";
import useUser from "../../../hooks/useUser";
import { Message } from "../../common/Message";
import Button from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { Firestore, doc, setDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

type SubscriptionPerios = "month" | "year";

type Subscription = {
  period: SubscriptionPerios;
  price: string;
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
    plan_id: "pro",
    period: subscription.period,
    price: subscription.price,
    currency: "USD",
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

  if (!user.emailVerified) {
    return (
      <Navigate
        to={{
          pathname: "/account/verify",
          search: `?next=${encodeURIComponent("/buy/pro")}`,
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-24">
      <div className="flex justify-center">
        <h2 className="font-tall text-center text-5xl font-bold sm:text-7xl">
          Get Tree of Science Pro
        </h2>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div>
          <p>With Tree of Science Pro you get:</p>
          <ul className="list-inside list-disc">
            <li>Upload files up to 100MB</li>
            <li>Unlimited history</li>
          </ul>
          <p>For just $10/month or $100/year</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <Button
          className="uppercase"
          disabled={subscribeMutation.isPending || subscribeMutation.isSuccess}
          onClick={() =>
            subscribeMutation.mutate({
              firestore: firebase.firestore,
              userId: user.uid,
              subscription: {
                period: "month",
                // Will create the subscriptions with price 0 for now
                price: "10.00",
              },
            })
          }
        >
          Buy Montly Subscription ($10/month)
        </Button>
        <Button
          className="uppercase"
          disabled={subscribeMutation.isPending || subscribeMutation.isSuccess}
          onClick={() =>
            subscribeMutation.mutate({
              firestore: firebase.firestore,
              userId: user.uid,
              subscription: {
                period: "year",
                // Will create the subscriptions with price 0 for now
                price: "100.00",
              },
            })
          }
        >
          Buy Annual Subscription ($100/year)
        </Button>
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
