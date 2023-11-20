import { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Papa from "papaparse";

import useUser from "../../hooks/useUser";

import { TreeResult } from "../../types/result";

import DownloadIcon from "../vectors/Download";

type Props = {
 treeSections: TreeResult
}

const Download: FC<Props> = ({ treeSections }) => {
 const user = useUser();
 const [isLoading, setIsLoading] = useState<boolean>(false);

 const createUri = useCallback((csv: string): string => {
  const blob = new Blob([csv])
  return URL.createObjectURL(blob)
 }, [])

 const download = useCallback((uri: string) => {
  const a = document.createElement("a")
  a.setAttribute("href", uri)
  a.setAttribute("download", "articles.csv")
  a.click()
  a.remove()
 }, [])

 const csvToJson = useCallback(() => {
  setIsLoading(true)
  const articles = Object.values(treeSections).flat()
  const csv = Papa.unparse(articles)
  const uri = createUri(csv)
  download(uri)
  setIsLoading(false)
 }, [treeSections])

 if (!user || user.plan !== "pro") {
  return (
   <Link
    aria-label="download"
    className="px-5 py-4 bg-slate-400/90 fixed bottom-10 right-10 rounded-full shadow-sm hover:shadow-md active:shadow-md"
    title="Become a pro user to download"
    to="/pricing"
   >
    <DownloadIcon />
   </Link>
  )
 }

 return (
  <button
   aria-label="download"
   className="px-5 py-4 bg-leaf fixed bottom-10 right-10 rounded-full shadow-sm hover:shadow-md active:shadow-md"
   title="Download CSV"
   onClick={csvToJson}
  >
   {isLoading ? (
    <>
     LOADING...
    </>
   ) : (
    <DownloadIcon />
   )}
  </button>
 )
}

export default Download;
