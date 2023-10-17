import { FC } from "react";

const GetStarted: FC = () => {
 return (
  <section className="mx-auto max-w-7xl">
   <div className="mx-auto max-w-lg text-center justify-center items-center flex flex-col gap-8">
    <h2 className="text-3xl font-tall sm:text-4xl">
     Get started today
    </h2>
    <p className="text-lg">
     It’s time to take control of your books. Buy our software so you can feel like you’re doing something productive.
    </p>
    <a
    className="px-4 py-2 font-tall uppercase font-bold text-slate-50 bg-leaf"
    href="/tos"
    >
     Start now
    </a>
   </div>
  </section>
 );
};

export default GetStarted;
