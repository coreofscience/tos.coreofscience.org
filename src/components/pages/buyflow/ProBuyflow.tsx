import useUser from "../../../hooks/useUser";
import { Navigate } from "react-router-dom";

const ProBuyflow = () => {
  const user = useUser();

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
          <p>For just $10/month</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button className="rounded-sm bg-leaf px-4 py-2 text-center font-tall font-bold uppercase text-slate-50">
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProBuyflow;
