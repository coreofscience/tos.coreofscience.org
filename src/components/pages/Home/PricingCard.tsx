import { FC } from "react";
import CheckCircleIcon from "../../vectors/CheckCircleIcon";
import { Link } from "react-router-dom";
import useUser from "../../../hooks/useUser";

type Props = {
 name: string;
 price: number | string;
 features: string[];
};

const PricingCard: FC<Props> = ({ name, price, features }: Props) => {
 const user = useUser();

 return (
  <section
   className={`shadow-xl shadow-slate-900/10 flex flex-col px-6 sm:px-8 py-8 rounded-sm ${name.toLowerCase() === "pro" ? "order-first bg-leaf lg:order-none" : ""
    }`}
  >
   <h3
    className={`text-4xl uppercase font-tall ${name.toLowerCase() === "pro" ? "text-slate-100" : "text-slate-900"
     }`}
   >
    {name}
   </h3>
   <p
    className={`font-tall mt-5 text-2xl font-light ${name.toLowerCase() === "pro" ? "text-slate-100" : "text-slate-900"
     }`}
   >
    {price}
   </p>
   <ul
    role="list"
    className={`order-last mt-10 flex flex-col gap-y-3 text-sm ${name.toLowerCase() === "pro" ? "text-slate-100" : "text-slate-900"
     }`}
   >
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
    to={`${name.toLowerCase() === "pro"
      ? "mailto:technology@coreofscience.org"
      : name.toLowerCase() === "free"
       ? "/tos"
       : user?.uid
        ? "/tos"
        : "/sign-up"
     }`}
    className={`font-tall uppercase group inline-flex items-center justify-center py-2 px-4 text-sm focus:outline-none mt-8 focus-visible:outline-white rounded-sm ${name.toLowerCase() === "pro"
      ? "font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-slate-900"
      : "ring-1 ring-slate-700"
     }`}
    aria-label={`Get started with the ${name} plan for ${price}`}
   >
    {name.toLowerCase() === "pro"
     ? "Contact us"
     : name.toLowerCase() == "basic"
      ? "Sign up"
      : "Grow Your Tree"}
   </Link>
  </section>
 );
};

export default PricingCard;
