import { FC } from "react";
import Testimonials from "./Testimonials";
import Hero from "./Hero";
import Pricing from "./Pricing";

const Home: FC = () => {

 return (
  <div className="flex flex-col gap-20">
   <Hero />
   <Testimonials />
   <Pricing />
 </div>
 )
};

export default Home;
