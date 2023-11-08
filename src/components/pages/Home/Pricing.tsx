import { FC } from "react";

import PricingCard from "./PricingCard";
import { includedFeaturesForBasic, includedFeaturesForPro } from "./constanst";

const Pricing: FC = () => {
  return (
    <section id="pricing" aria-label="Pricing" className="container flex flex-col mx-auto gap-10 xs:px-0">
      <div className="md:text-center">
        <h2 className="text-3xl font-tall sm:text-4xl whitespace-nowrap">
         Simple pricing for everyone
        </h2>
      </div>
      <div className="grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-3xl lg:place-self-center lg:gap-x-8 lg:grid-cols-2 xl:mx-0 xl:gap-x-8">
        <PricingCard
         name="Pro"
         price="$10/month"
         features={includedFeaturesForPro}
        />
        <PricingCard
         name="Basic"
         price="$0/month"
         features={includedFeaturesForBasic}
        />
      </div>
    </section>
  );
};

export default Pricing;
