import useUser from "../../../hooks/useUser";
import TreeHistory from "../../upload/TreeHistory";

const History = () => {
  const user = useUser();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-tall text-2xl font-bold uppercase">Tree History</h2>
      </div>
      {user ? (
        <TreeHistory userId={user.uid} />
      ) : (
        <p>Log in to see your tree history.</p>
      )}
    </div>
  );
};

export default History;
