import cn from "../../../utils/cn";
import Button from "../../ui/Button";
import CheckCircleIcon from "../../vectors/CheckCircleIcon";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  name: string;
  price: number | string;
  cta: string;
  href: string;
  features: string[];
  primary?: boolean;
};

const PricingCard: FC<Props> = ({
  name,
  price,
  cta,
  href,
  features,
  primary,
}: Props) => {
  return (
    <section
      className={`flex flex-col gap-8 rounded-sm px-6 py-8 shadow-xl shadow-slate-900/10 sm:px-8 ${
        primary ? "order-first bg-leaf lg:order-none" : ""
      }`}
    >
      <h3
        className={`font-tall text-4xl uppercase ${
          primary ? "text-slate-100" : "text-slate-900"
        }`}
      >
        {name}
      </h3>
      <p
        className={`font-tall text-2xl font-light ${
          primary ? "text-slate-100" : "text-slate-900"
        }`}
      >
        {price}
      </p>
      <ul
        className={`order-last flex flex-col gap-y-3 text-sm ${
          primary ? "text-slate-100" : "text-slate-900"
        }`}
      >
        {features.map((feature) => (
          <li className="flex items-center" key={feature}>
            <CheckCircleIcon
              textColor={primary ? "text-slate-100" : "text-slate-900"}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button variant="outline" className={cn({ "bg-white": primary })} asChild>
        <Link
          to={href}
          aria-label={`Get started with the ${name} plan for ${price}`}
        >
          {cta}
        </Link>
      </Button>
    </section>
  );
};

export default PricingCard;
