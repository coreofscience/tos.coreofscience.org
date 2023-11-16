import { FC, useLayoutEffect, useMemo, useState } from "react";

import DownloadIcon from "../vectors/Download";
import { TreeResult } from "../../types/result";

type Props = {
 treeSections: TreeResult
}

const Download: FC<Props> = ({ treeSections }) => {
 const [uri, setUri] = useState<string>("")

 const csv = useMemo(() => {
  const articles = Object.values(treeSections).flat()
  let csv: string = Object.keys(articles[0]).sort().join(',')

  csv = csv.replace("leaf,", "")
  csv = csv.replace("branch,", "")
  csv = csv.replace("trunk,", "")
  csv = csv.replace("root,", "")

  for (const article of articles) {
   csv = csv + "\n" + `${article.authors.join(";").replaceAll(",", "") ?? ""},${article.doi ? article.doi.replaceAll("[", "").replaceAll("]", "").replaceAll(",", ";") : ""},${article.issue ?? ""},${article.journal ? article.journal.replaceAll(",", ";") : ""},${article.keywords.join(";") ?? ""},${article.label ?? ""},${article.page ?? ""},${article.title ? article.title.replaceAll(",", "") : ""},${article.volume ?? ""},${article.year ?? ""}`
  }

  return csv
 }, [treeSections])

 useLayoutEffect(() => {
  const blob = new Blob([csv])
  const uri = URL.createObjectURL(blob)
  setUri(uri)
 }, [])

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
