import { FC, useLayoutEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import useUser from "../../hooks/useUser";

import { TreeResult } from "../../types/result";

import DownloadIcon from "../vectors/Download";

type Props = {
 treeSections: TreeResult
}

const createColumn = (articleProperty: string | number): string => {
 if (typeof articleProperty === "number") {
  return String(articleProperty)
 }
 return articleProperty.replace(/[\[\],]/gm, "")
}

const Download: FC<Props> = ({ treeSections }) => {
 const user = useUser();

 const [uri, setUri] = useState<string>("")

 const csv = useMemo(() => {
  const articles = Object.values(treeSections).flat()
  const headers: string = Object.keys(articles[0]).sort().join(',')

  let csv: string = headers.replace(/leaf,|branch,|trunk,|root,/g, "")
  for (const article of articles) {
   const row: string = [
    createColumn(article.authors.join(";") ?? ""),
    createColumn(article.doi ?? ""),
    createColumn(article.issue ?? ""),
    createColumn(article.journal ?? ""),
    createColumn(article.keywords.join(";") ?? ""),
    createColumn(article.label ?? ""),
    createColumn(article.page ?? ""),
    article.title ? article.title.replaceAll(",", "") : "",
    createColumn(article.volume ?? ""),
    createColumn(article.year ?? ""),
   ].join(",")

   csv = csv + "\n" + row
  }
  return csv
 }, [treeSections])

 useLayoutEffect(() => {
  const blob = new Blob([csv])
  const uri = URL.createObjectURL(blob)
  setUri(uri)
 }, [])

 if (!user || user.plan !== "pro") {
  return (
   <Link
    aria-label="download"
    className="px-5 py-4 bg-slate-400/90 rounded-sm fixed bottom-10 right-10"
    title="Become a pro user to download"
    to="/pricing"
   >
    <DownloadIcon />
   </Link>
  )
 }

 return (
  <a
   aria-label="download"
   className="px-5 py-4 bg-leaf rounded-sm fixed bottom-10 right-10"
   title="Download CSV"
   href={uri}
   download="articles.csv"
  >
   <DownloadIcon />
  </a>
 )
}

export default Download;
