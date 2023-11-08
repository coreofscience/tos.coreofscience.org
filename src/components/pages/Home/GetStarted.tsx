import { FC } from "react";
import { Link } from "react-router-dom";

const GetStarted: FC = () => {
 return (
  <section className="mx-auto max-w-7xl container">
   <div className="mx-auto max-w-lg text-center justify-center items-center flex flex-col gap-8">
    <h2 className="text-3xl font-tall sm:text-4xl">Your tree explained</h2>
    <p className="text-lg">Learn all about the elements of your tree.</p>
    <Link
     className="px-4 py-2 font-tall uppercase font-bold text-slate-50 bg-leaf"
     to="/docs/sap"
    >
     Learn more
    </Link>
   </div>
  </section>
 );
};

export default GetStarted;
