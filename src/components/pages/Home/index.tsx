import { FC } from "react";
import Testimonials from "./Testimonials";
import Hero from "./Hero";
import Pricing from "./Pricing";
import TrustUs from "./TrustUs";
import FAQ from "./FAQ";
import GetStarted from "./GetStarted";
import SecondaryFeatures from "./SecondaryFeatures";
import PrimaryFeatures from "./PrimaryFeatures";

const Home: FC = () => {

 return (
  <div className="flex flex-col gap-40">
   <Hero />
   <TrustUs />
   <PrimaryFeatures />
   <SecondaryFeatures />
   <GetStarted />
   <Testimonials />
   <Pricing />
   <FAQ />
 </div>
 )
};

export default Home;
