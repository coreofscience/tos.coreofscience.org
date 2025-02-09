import useUser from "../../../hooks/useUser";
import TreeHistory from "../../history/TreeHistory";

const History = () => {
  const user = useUser();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-tall text-2xl font-bold uppercase">Tree History</h2>
      </div>
      {user ? (
        <TreeHistory user={user} />
      ) : (
        <p>Log in to see your tree history.</p>
      )}
    </div>
  );
};

export default History;
