import { FC } from "react";
import CheckCircleIcon from "../../vectors/CheckCircleIcon";
import { Link } from "react-router-dom";
import useUser from "../../../hooks/useUser";

type Props = {
 name: string;
 description: string;
 price: number | string;
 features: string[];
};

const PricingCard: FC<Props> = ({name, description, price, features}: Props) => {
 const user = useUser();

 return (
  <section className={`shadow-xl shadow-slate-900/10 flex flex-col px-6 sm:px-8 py-8 ${name.toLowerCase() === 'pro' ? "order-first bg-leaf lg:order-none" : ""}`}>
   <h3 className={`mt-5 text-lg uppercase font-tall ${name.toLowerCase() === "pro" ? "text-slate-100" : "text-slate-900"}`}>{name}</h3>
   <p className={`mt-2 ${name.toLowerCase() === "pro" ? "text-slate-100" : "text-slate-900"}`}>{description}</p>
   <p className={`font-tall order-first text-5xl font-light ${name.toLowerCase() === "pro" ? "text-slate-100": "text-slate-900"}`}>
    {typeof price === "number" ? (
     `$${price}`
    ): price}
   </p>
   <ul role="list" className={`order-last mt-10 flex flex-col gap-y-3 text-sm ${name.toLowerCase() === "pro" ? "text-slate-100" : "text-slate-900"}`}>
    {features.map((feature) => (
     <li className="flex" key={feature}>
      {name.toLowerCase() === "pro" ? (
       <CheckCircleIcon textColor="text-slate-100" />
      ) : (
       <CheckCircleIcon textColor="text-slate-900" />
      )}
      <span className="ml-4">{feature}</span>
     </li>
    ))}
   </ul>
    <Link
     to={`${name.toLowerCase() === "pro" ? "mailto:technology@coreofscience.org" : name.toLowerCase() === "free" ? "/tos" : user?.uid ? "/tos" : "/sign-up"}`}
     className={`font-tall uppercase group inline-flex items-center justify-center py-2 px-4 text-sm focus:outline-none mt-8 focus-visible:outline-white ${name.toLowerCase() === "pro" ? "font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-slate-900" : "ring-1 ring-slate-700"}`}
     aria-label={`Get started with the ${name} plan for ${price}`}
    >
     {name.toLowerCase() === "pro" ? (
      "Contact us"
     ) : (
      "Start now"
     )}
    </Link>
  </section>
 );
};

export default PricingCard;
