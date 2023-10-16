import { FC } from "react";
import PricingCard from "./PricingCard";
import {
 includedFeaturesForFree,
 includedFeaturesForBasic,
 includedFeaturesForPro
} from "./constanst";
import UnderlineIconForPricing from "../../vectors/UnderlineIconForPricing";

const Pricing: FC = () => {
 return (
  <section id="pricing" aria-label="Pricing">
   <div className="flex flex-col mx-auto gap-10">
    <div className="md:text-center">
     <h2 className="font-display text-3xl font-tall tracking-tight sm:text-4xl">
      <span className="relative whitespace-nowrap">
       <UnderlineIconForPricing />
       <span className="relative">Simple pricing,</span>
      </span> for everyone.
     </h2>
     <p
      className="mt-4 text-lg text-slate-700">
      It doesn’t matter what size your business is, our software won’t work well for you.</p>
    </div>
    <div
     className="grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8">
     <PricingCard name="Free" description="Good for anyone who is self-employed and just getting started." price="Free" features={includedFeaturesForFree} />
     <PricingCard name="Pro" description="Perfect for small / medium sized businesses." price="Contact us" features={includedFeaturesForPro} />
     <PricingCard name="Basic" description="For even the biggest enterprise companies." price="Free" features={includedFeaturesForBasic} />
    </div>
   </div>
  </section>
 );
};

export default Pricing;
