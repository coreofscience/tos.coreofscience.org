import PricingCard from "./PricingCard";
import { FC } from "react";

const includedFeaturesForBasic: string[] = [
  "Up to 10 megabyte file sizes",
  "History of last 3 searches",
];

const includedFeaturesForPro: string[] = [
  "Up to 100 megabyte file sizes",
  "Unlimited history",
];

const Pricing: FC = () => {
  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="xs:px-0 container mx-auto flex flex-col gap-10"
    >
      <div className="md:text-center">
        <h2 className="text-center font-tall text-3xl sm:text-4xl">
          Simple pricing for everyone
        </h2>
      </div>
      <div className="grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-3xl lg:grid-cols-2 lg:gap-x-8 lg:place-self-center xl:mx-0 xl:gap-x-8">
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
