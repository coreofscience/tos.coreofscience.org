import { FC } from "react";
import { Link } from "react-router-dom";

const GetStarted: FC = () => {
  return (
    <section className="container mx-auto max-w-7xl">
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-8 text-center">
        <h2 className="text-center font-tall text-3xl sm:text-4xl">
          Your tree explained
        </h2>
        <p className="text-lg">Learn all about the elements of your tree.</p>
        <Link
          className="rounded-sm bg-leaf px-4 py-2 font-tall font-bold uppercase text-slate-50"
          to="/docs/sap"
        >
          Learn more
        </Link>
      </div>
    </section>
  );
};

export default GetStarted;
