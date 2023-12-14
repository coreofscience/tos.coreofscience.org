import { Dispatch, FC, SetStateAction } from "react";

type Props = {
 handlePrevious: () => void,
 handleNext: () => void,
 currentPage: number,
 setCurrentPage: Dispatch<SetStateAction<number>>,
 isAlreadyLastPageTree: boolean,
 isAlreadyLastPageProTree: boolean,
}

const Pagination: FC<Props> = ({currentPage, setCurrentPage, handlePrevious, handleNext,  isAlreadyLastPageTree, isAlreadyLastPageProTree,}) => {

 return (
  <nav>
   <ul className="flex list-style-none items-center">
    <li>
     <button
      className="relative block rounded px-3 py-1.5 text-sm hover:bg-slate-100"
      aria-label="Previous"
      onClick={handlePrevious}
      disabled={currentPage === 1}
     >
      <span className="text-xl">&#8249;</span>
     </button>
    </li>
    <div className="flex gap-1">
     <span className="text-slate-500">Page</span><span>{currentPage}</span>
    </div>
    <li>
     <button
      className="relative block rounded px-3 py-1.5 text-sm hover:bg-slate-100"
      aria-label="Next"
      onClick={handleNext}
      disabled={isAlreadyLastPageProTree && isAlreadyLastPageTree}
     >
      <span className="text-xl">&#8250;</span>
     </button>
    </li>
   </ul>
  </nav>
 )
}

export default Pagination;
