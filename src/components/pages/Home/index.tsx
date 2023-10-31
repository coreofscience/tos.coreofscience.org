import React, { FC, useMemo } from "react";

const FileDropper = React.lazy(() => import("../../upload/FileDropper"));

import Testimonials from "./Testimonials";
import Hero from "./Hero";
import Pricing from "./Pricing";
import TrustUs from "./TrustUs";
import FAQ from "./FAQ";
import GetStarted from "./GetStarted";
import PrimaryFeatures from "./PrimaryFeatures";

import useUser from "../../../hooks/useUser";

import getMaxSize from "../../../utils/getMaxSize";

const Home: FC = () => {
 const user = useUser();

 const maxSize: number = useMemo(() => getMaxSize(user), [user])

 return (
  <div className="flex flex-col gap-40">
   <Hero />
   <div className="flex flex-col gap-8">
    <p className="text-center">Start now by planting your seed file and in a matter of seconds you will have your tree with the relevant bibliography.</p>
    <FileDropper maxSize={maxSize} />
   </div>
   <TrustUs />
   <PrimaryFeatures />
   <GetStarted />
   <Testimonials />
   <Pricing />
   <FAQ />
  </div>
 );
};

export default Home;
