import useUser from "../../../hooks/useUser";
import Button from "../../ui/Button";
import { Navigate, useNavigate } from "react-router-dom";

const Thanks = () => {
  const user = useUser();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Navigate
        to={{
          pathname: "/log-in",
          search: `?next=${encodeURIComponent("/buy/pro/thanks")}`,
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-24">
      <div className="flex justify-center">
        <h2 className="text-center font-tall text-5xl font-bold sm:text-7xl">
          Thanks for purchasing Tree of Science Pro!
        </h2>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-center text-lg">
          You now have access to all the pro features of Tree of Science.
        </p>
        <p className="text-center text-lg">
          As you probably noticed you were not charged, and you won't be charged
          for the time being.
        </p>
        <p>
          Once we start charging for Tree of Science Pro, you will be given the
          option to renew or cancel your subscription.
        </p>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <Button className="uppercase" onClick={() => navigate("/tos")}>
          Grow your Pro Tree now!
        </Button>
      </div>
    </div>
  );
};

export default Thanks;
