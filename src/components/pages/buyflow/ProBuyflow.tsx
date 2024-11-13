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
    <div>
      <h1>ProBuyflow</h1>
    </div>
  );
};

export default ProBuyflow;
