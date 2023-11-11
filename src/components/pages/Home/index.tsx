import React, { FC, useMemo } from "react";

const FileDropper = React.lazy(() => import("../../upload/FileDropper"));

import Testimonials from "./Testimonials";
import Hero from "./Hero";
import Pricing from "./Pricing";
import GetStarted from "./GetStarted";
import HowItWorks from "./HowItWorks";

import useUser from "../../../hooks/useUser";

import getMaxSize from "../../../utils/getMaxSize";

const Home: FC = () => {
 const user = useUser();

 const maxSize: number = useMemo(() => getMaxSize(user), [user]);

 return (
  <div className="flex flex-col gap-24">
   <Hero />
   <div className="flex flex-col gap-8 container">
    <p className="text-center text-3xl font-tall sm:text-4xl whitespace-nowrap">Plant Your Seeds</p>
    <FileDropper maxSize={maxSize} />
   </div>
   <HowItWorks />
   <GetStarted />
   <Testimonials />
   <Pricing />
  </div>
 );
};

export default Home;
