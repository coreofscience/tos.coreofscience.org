import React, { FC, useMemo } from "react";

import Testimonials from "./Testimonials";
import Hero from "./Hero";
import Pricing from "./Pricing";
import GetStarted from "./GetStarted";
import HowItWorks from "./HowItWorks";

import useUser from "../../../hooks/useUser";

import getMaxSize from "../../../utils/getMaxSize";

const FileDropper = React.lazy(() => import("../../upload/FileDropper"));

const Home: FC = () => {
  const user = useUser();
  const maxSize: number = useMemo(() => getMaxSize(user), [user]);
  return (
    <div className="flex flex-col gap-24">
      <Hero />
      <div className="container flex flex-col gap-8">
        <h2 className="text-center font-tall text-3xl sm:text-4xl">
          Plant Your Seeds
        </h2>
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
