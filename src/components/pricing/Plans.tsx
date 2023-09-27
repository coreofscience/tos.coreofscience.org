import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import {
  includedFeaturesForBasic,
  includedFeaturesForFree,
  includedFeaturesForPro,
} from "./constanst";

const Plans: FC = () => {
  const user = useUser();

  return (
    <Fragment>
      <div className="mx-auto max-w-7xl py-20 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 font-tall uppercase">
            Pricing
          </h2>
          <p className="mt-2 text-2xl leading-8">
            Choose one that's right for you.
          </p>
        </div>
        <div className="flex flex-col mt-10 gap-5 lg:flex-row lg:justify-around">
          <div className="w-11/12 self-center ring-1 ring-inset ring-gray-300 flex flex-col justify-start md:w-8/12 lg:self-end lg:w-1/3">
            <div className="max-w-xs py-6 px-8">
              <h1 className="font-tall font-bold text-4xl uppercase">Free</h1>
              <p className="mt-1">
                No need to register or pay, start creating your trees right now.
              </p>
              <p className="mt-6 flex items-baseline gap-x-2">
                <span className="text-2xl font-bold font-tall tracking-tight uppercase">
                  Free
                </span>
              </p>
              <div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-3 text-sm leading-6"
                >
                  {includedFeaturesForBasic.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              to="/"
              className="my-6 mx-10 block text-slate-50 bg-root px-4 py-2 text-center text-sm font-bold font-tall uppercase"
            >
              Start now
            </Link>
          </div>
          <div className="w-11/12 self-center ring-1 ring-inset ring-gray-300 flex flex-col justify-start md:w-8/12 lg:self-end lg:w-1/3">
            <div className="max-w-xs py-6 px-8">
              <h1 className="font-tall font-bold text-4xl uppercase">Pro</h1>
              <p className="mt-1">
                Contact us and we will understand your needs and give you the
                best offer that suits your needs.
              </p>
              <p className="mt-6 flex items-baseline gap-x-2">
                <span className="text-2xl font-bold font-tall tracking-tight uppercase">
                  Contact us
                </span>
              </p>
              <div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-3 text-sm leading-6"
                >
                  {includedFeaturesForPro.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <a
              href="mailto:technology@coreofscience.org"
              className="my-6 mx-10 block text-slate-50 bg-leaf px-4 py-2 text-center text-sm font-bold font-tall uppercase"
            >
              Contact us
            </a>
          </div>
          <div className="w-11/12 self-center ring-1 ring-inset ring-gray-300 flex flex-col justify-start md:w-8/12 lg:self-end lg:w-1/3">
            <div className="max-w-xs py-6 px-8">
              <h1 className="font-tall font-bold text-4xl uppercase">Basic</h1>
              <p className="mt-1">
                You only need to register and start creating your trees, you
                don't need to pay anything.
              </p>
              <p className="mt-6 flex items-baseline gap-x-2">
                <span className="text-2xl font-bold font-tall tracking-tight uppercase">
                  Free
                </span>
              </p>
              <div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-3 text-sm leading-6"
                >
                  {includedFeaturesForFree.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {user?.uid ? (
              <Link
                to="/"
                className="my-6 mx-10 block text-slate-50 bg-trunk px-4 py-2 text-center text-sm font-bold font-tall uppercase"
              >
                Start now
              </Link>
            ) : (
              <Link
                to="/sign-up"
                className="my-6 mx-10 block text-slate-50 bg-trunk px-4 py-2 text-center text-sm font-bold font-tall uppercase"
              >
                Start now
              </Link>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Plans;
