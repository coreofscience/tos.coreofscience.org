import { FC } from "react";

import { LoadingPropsType } from "./types";

const Loading: FC<LoadingPropsType> = ({user, proTrees, trees}) => {
 if (user.plan === "pro") {
  if (proTrees.state.isLoading || trees.state.isLoading) {
   return <p>Loading...</p>
  }
 }
 if (trees.state.isLoading) return <p>Loading...</p>
 return <></>
}

export default Loading;
