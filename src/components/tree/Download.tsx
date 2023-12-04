import React, { FC, useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Papa from "papaparse";

import useUser from "../../hooks/useUser";

import { TreeResult } from "../../types/result";
import { Analysis } from "../../types/Analysis";

import FloatingButtonMenu from "../common/FloatingButtonMenu";

import DownloadIcon from "../vectors/Download";
import CancelIcon from "../vectors/CancelIcon";
import AddIcon from "../vectors/AddIcon";
import FileArrowDown from "../vectors/FileArrowDown";

type Props = {
 treeSections: TreeResult
 _analysis?: Analysis
}

const Download: FC<Props> = ({ treeSections, _analysis }) => {
 const user = useUser();
 const [isLoading, setIsLoading] = useState<boolean>(false);

 const createUri = useCallback((csv: string): string => {
  const blob = new Blob([csv])
  return URL.createObjectURL(blob)
 }, [])

 const download = useCallback((uri: string, fileName: string) => {
  const a = document.createElement("a")
  a.setAttribute("href", uri)
  a.setAttribute("download", fileName)
  a.click()
  a.remove()
 }, [])

 const downloadArticles = useCallback(() => {
  setIsLoading(true)
  const articles = Object.values(treeSections).flat()
  const csv = Papa.unparse(articles)
  const uri = createUri(csv)
  download(uri, "articles.csv")
  setIsLoading(false)
 }, [treeSections])

 const downloadAnalysis = useCallback(() => {
  if (_analysis) {
   setIsLoading(true)
   const years: string[] = Object.keys(_analysis.cited)
   const data: {year: number; cited: number; published: number}[] = []
   years.forEach((year) => {
    data.push({
     year: Number(year),
     cited: _analysis.cited[year],
     published: _analysis.published[year]
    })
   })
   const csv = Papa.unparse(data)
   const uri = createUri(csv)
   download(uri, "analysis.csv")
   setIsLoading(false)
  }
 }, [_analysis])

 const childButtons = useMemo(() => {
  const childButtons = [
   {
    name: "Articles",
    icon: <DownloadIcon />,
    action: downloadArticles,
    attributes: {
     "arial-label": "download",
     title: "Download CSV of articles"
    },
   },
  ];
  if (_analysis) {
   childButtons.push({
    name: "Analysis",
    icon: <FileArrowDown />,
    action: downloadAnalysis,
    attributes: {
     "arial-label": "download",
     title: "Download CSV of analysis"
    },
   })
  }
  return childButtons
 }, [downloadArticles])

 if (!user || user.plan !== "pro") {
  return (
   <Link
    aria-label="download"
    className="px-4 py-4 bg-slate-400/90 fixed bottom-10 right-10 rounded-full shadow-sm hover:shadow-md active:shadow-md"
    title="Become a pro user to download"
    to="/pricing"
   >
    <DownloadIcon />
   </Link>
  )
 }

 return (
  <>
    <FloatingButtonMenu
     childButtons={childButtons}
     iconResting={<CancelIcon />}
     iconActive={<AddIcon />}
    />
  </>
 )
}

export default Download;
