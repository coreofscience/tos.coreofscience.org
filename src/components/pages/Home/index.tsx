import { FC } from "react";
import Testimonials from "./Testimonials";
import Hero from "./Hero";
import Pricing from "./Pricing";
import TrustUs from "./TrustUs";
import FAQ from "./FAQ";

const Home: FC = () => {

 return (
  <div className="flex flex-col gap-40">
   <Hero />
   <TrustUs />
   <Testimonials />
   <Pricing />
   <FAQ />
 </div>
 )
};

export default Home;
