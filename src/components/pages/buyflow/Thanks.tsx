import useUser from "../../../hooks/useUser";
import { Navigate, useNavigate } from "react-router-dom";

const Thanks = () => {
  const user = useUser();
  const navigate = useNavigate();

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
          Thanks for purchasing Tree of Science Pro!
        </h2>
      </div>
      <div className="flex flex-col gap-4 items-center">
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
        <button
          className="rounded-sm bg-leaf px-4 py-2 text-center font-tall font-bold uppercase text-slate-50"
          onClick={() => navigate("/tos")}
        >
          Grow your Pro Tree now!
        </button>
      </div>
    </div>
  );
};

export default Thanks;
