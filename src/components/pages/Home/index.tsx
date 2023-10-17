import { FC } from "react";
import Testimonials from "./Testimonials";
import Hero from "./Hero";
import Pricing from "./Pricing";
import TrustUs from "./TrustUs";

const Home: FC = () => {

 return (
  <div className="flex flex-col gap-20">
   <Hero />
   <TrustUs />
   <Testimonials />
   <Pricing />
 </div>
 )
};

export default Home;
