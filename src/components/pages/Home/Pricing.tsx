import { FC } from "react";

import PricingCard from "./PricingCard";
import { includedFeaturesForBasic, includedFeaturesForPro } from "./constanst";

const Pricing: FC = () => {
  return (
    <section id="pricing" aria-label="Pricing">
      <div className="flex flex-col mx-auto gap-10 px-5 xs:px-0">
        <div className="md:text-center">
          <h2 className="text-3xl font-tall sm:text-4xl">
            <span className="relative whitespace-nowrap">
              <span className="relative">Simple pricing,</span>
            </span>{" "}
            for everyone
          </h2>
          <p className="mt-4 text-lg">
            No matter what your needs are, our software will work well for you.
          </p>
        </div>
        <div className="grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-3xl lg:place-self-center lg:gap-x-8 lg:grid-cols-2 xl:mx-0 xl:gap-x-8">
          <PricingCard
            name="Pro"
            description="Contact us and we will understand your needs and give you the best offer that suits your needs."
            price="$10/month"
            features={includedFeaturesForPro}
          />
          <PricingCard
            name="Basic"
            description="You only need to register and start creating your trees."
            price="$0/month"
            features={includedFeaturesForBasic}
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
