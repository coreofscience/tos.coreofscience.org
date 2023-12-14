import { FC, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

import { TreeSummary } from "../../../types/treeSummary";
import useUser from "../../../hooks/useUser";
import Pagination from "./Pagination";

type Props = {
 allTrees: TreeSummary[],
 handlePrevious: () => void,
 handleNext: () => void,
 currentPage: number,
 setCurrentPage: Dispatch<SetStateAction<number>>,
 isAlreadyLastPageTree: boolean,
 isAlreadyLastPageProTree: boolean,
}

const Table: FC<Props> = ({ allTrees, currentPage, setCurrentPage, handleNext, handlePrevious, isAlreadyLastPageTree, isAlreadyLastPageProTree }) => {
 const user = useUser();

 if (!user) {
  return null
 }

 return (
  <>
   <table className="table-auto border-collapse max-w-fit">
    <tbody className="flex flex-col gap-2">
    {allTrees.map(({ treeId, summary, isPro }) => (
     <tr key={treeId} className="border-b border-slate-300">
      <td>
       {isPro ? (
        <Link
         className="text-sky-600 hover:text-sky-800 active:text-sky-800 transition-colors ease-in flex flex-row items-center"
         to={`/users/${user.uid}/proTrees/${treeId}`}
        >
         {summary}
         <span className="text-xs ml-2 px-3 py-0.5 bg-leaf text-slate-50 font-semibold flex-shrink-0">
                    PRO
                  </span>
        </Link>
       ) : (
        <Link
         className="text-sky-600 hover:text-sky-800 active:text-sky-800 transition-colors ease-in flex flex-row items-center"
         to={`/users/${user.uid}/trees/${treeId}`}
        >
         {summary}
        </Link>
       )}
      </td>
     </tr>
    ))}
    </tbody>
   </table>
   <Pagination
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
    handlePrevious={handlePrevious}
    handleNext={handleNext}
    isAlreadyLastPageTree={isAlreadyLastPageTree}
    isAlreadyLastPageProTree={isAlreadyLastPageProTree}
   />
  </>
 )
}

export default Table;
