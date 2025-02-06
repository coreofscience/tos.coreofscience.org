import { FC, useCallback, useState } from "react";

enum Section {
  PlantSeeds = "PLANT_SEEDS",
  BuildTree = "BUILD_TREE",
  IdentifyRelevantTheories = "IDENTIFY_RELEVANT_THEORIES",
  ExtractYourLiteratureList = "EXTRACT_YOUR_LITERATURE_LIST",
}

const HowItWorks: FC = () => {
  const [show, setShow] = useState<Section>(Section.PlantSeeds);

  const toggleShow = useCallback((label: Section) => {
    setShow((curr) => {
      if (curr === label) {
        return curr;
      }
      return label;
    });
  }, []);

  return (
    <section
      id="how-it-works"
      aria-label="How Tree of Science works"
      className="overflow-hidden bg-leaf pb-10 pt-20"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="text-center font-tall text-3xl text-slate-50 sm:text-4xl md:text-5xl">
            How Tree of Science Works
          </h2>
          <p className="mt-6 text-lg text-slate-50">
            Within minutes Tree of Science identifies core theories, essential
            works, and latest contributions for a state-of- the-art literature
            summary.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
          <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:pb-0 lg:col-span-5">
            <div
              className="relative z-10 flex gap-x-1 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal"
              role="tablist"
            >
              <div
                className={`group relative rounded-l-sm px-4 py-1 lg:p-6 ${
                  show === Section.PlantSeeds
                    ? "bg-green-200/10"
                    : "hover:bg-green-400/10 lg:hover:bg-green-400/10"
                }`}
                onClick={() => toggleShow(Section.PlantSeeds)}
              >
                <h3>
                  <button
                    className="ui-not-focus-visible:outline-none text-lg text-slate-50"
                    role="tab"
                    type="button"
                    tabIndex={show === Section.PlantSeeds ? 0 : -1}
                  >
                    <span className="absolute inset-0"></span>
                    Plant your seeds
                  </button>
                </h3>
                <p className="mt-2 hidden text-sm text-slate-50 lg:block">
                  Look up your topic on Scopus or Web of Science and import your
                  data into the Tree of Science application.
                </p>
              </div>
              <div
                className={`group relative rounded-l-sm px-4 py-1 lg:p-6 ${
                  show === Section.BuildTree
                    ? "bg-green-200/10"
                    : "hover:bg-green-400/10 lg:hover:bg-green-400/10"
                }`}
                onClick={() => toggleShow(Section.BuildTree)}
              >
                <h3>
                  <button
                    className="ui-not-focus-visible:outline-none text-lg text-slate-50"
                    role="tab"
                    type="button"
                    tabIndex={show === Section.BuildTree ? 0 : -1}
                  >
                    <span className="absolute inset-0"></span>
                    Build your tree
                  </button>
                </h3>
                <p className="mt-2 hidden text-sm text-slate-50 lg:block">
                  Build your Tree of Science with the most modern algoritms and
                  analyze your data on the fly.
                </p>
              </div>

              <div
                className={`group relative rounded-l-sm px-4 py-1 lg:p-6 ${
                  show === Section.IdentifyRelevantTheories
                    ? "bg-green-200/10"
                    : "hover:bg-green-400/10 lg:hover:bg-green-400/10"
                }`}
                onClick={() => toggleShow(Section.IdentifyRelevantTheories)}
              >
                <h3>
                  <button
                    className="ui-not-focus-visible:outline-none text-lg text-slate-50"
                    role="tab"
                    type="button"
                    tabIndex={
                      show === Section.IdentifyRelevantTheories ? 0 : -1
                    }
                  >
                    <span className="absolute inset-0"></span>
                    Identify relevant theories
                  </button>
                </h3>
                <p className="mt-2 hidden text-sm text-slate-50 lg:block">
                  Identify relevant theories that the field is based on (roots),
                  essential works (trunk) and newer publications (leaves).
                </p>
              </div>

              <div
                className={`group relative rounded-l-sm px-4 py-1 lg:p-6 ${
                  show === Section.ExtractYourLiteratureList
                    ? "bg-green-200/10"
                    : "hover:bg-green-400/10 lg:hover:bg-green-400/10"
                }`}
                onClick={() => toggleShow(Section.ExtractYourLiteratureList)}
              >
                <h3>
                  <button
                    className="ui-not-focus-visible:outline-none text-lg text-slate-50"
                    role="tab"
                    type="button"
                    tabIndex={
                      show === Section.ExtractYourLiteratureList ? 0 : -1
                    }
                  >
                    <span className="absolute inset-0"></span>
                    Extract your literature list
                  </button>
                </h3>
                <p className="mt-2 hidden text-sm text-slate-50 lg:block">
                  Extract your literature list and start writing.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div
              role="tabpanel"
              tabIndex={show === Section.PlantSeeds ? 0 : -1}
              style={show !== Section.PlantSeeds ? { display: "none" } : {}}
              hidden={show !== Section.PlantSeeds}
            >
              <div className="relative sm:px-6 lg:hidden">
                <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0"></div>
                <p className="relative mx-auto max-w-2xl text-base text-slate-50 sm:text-center">
                  Look up your topic on Scopus or Web of Science and import your
                  data into the Tree of Science application.
                </p>
              </div>
              <div className="mt-10 w-[45rem] overflow-hidden rounded-sm bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                <img
                  alt=""
                  width="2174"
                  height="1464"
                  decoding="async"
                  data-nimg="1"
                  className="w-full"
                  style={{ color: "transparent" }}
                  sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                  src="/assets/howItWorks/plant-seeds.png"
                />
              </div>
            </div>
            <div
              role="tabpanel"
              tabIndex={show === Section.BuildTree ? 0 : -1}
              hidden={show !== Section.BuildTree}
              style={show !== Section.BuildTree ? { display: "none" } : {}}
            >
              <div className="relative sm:px-6 lg:hidden">
                <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0"></div>
                <p className="relative mx-auto max-w-2xl text-base text-slate-50 sm:text-center">
                  Build your Tree of Science with the most modern algoritms and
                  analyze your data on the fly.
                </p>
              </div>
              <div className="mt-10 w-[45rem] overflow-hidden rounded-sm bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                <img
                  alt=""
                  width="2174"
                  height="1464"
                  decoding="async"
                  data-nimg="1"
                  className="w-full"
                  style={{ color: "transparent" }}
                  sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                  src="/assets/howItWorks/build-tree.png"
                />
              </div>
            </div>

            <div
              role="tabpanel"
              tabIndex={show === Section.IdentifyRelevantTheories ? 0 : -1}
              hidden={show !== Section.IdentifyRelevantTheories}
              style={
                show !== Section.IdentifyRelevantTheories
                  ? { display: "none" }
                  : {}
              }
            >
              <div className="relative sm:px-6 lg:hidden">
                <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0"></div>
                <p className="relative mx-auto max-w-2xl text-base text-slate-50 sm:text-center">
                  Identify relevant theories that the field is based on (roots),
                  essential works (trunk) and newer publications (leaves).
                </p>
              </div>
              <div className="mt-10 w-[45rem] overflow-hidden rounded-sm bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                <img
                  alt=""
                  width="2174"
                  height="1464"
                  decoding="async"
                  data-nimg="1"
                  className="w-full"
                  style={{ color: "transparent" }}
                  sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                  src="/assets/howItWorks/identify-relevant-theories.png"
                />
              </div>
            </div>

            <div
              role="tabpanel"
              tabIndex={show === Section.ExtractYourLiteratureList ? 0 : -1}
              hidden={show !== Section.ExtractYourLiteratureList}
              style={
                show !== Section.ExtractYourLiteratureList
                  ? { display: "none" }
                  : {}
              }
            >
              <div className="relative sm:px-6 lg:hidden">
                <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0"></div>
                <p className="relative mx-auto max-w-2xl text-base text-slate-50 sm:text-center">
                  Extract your literature list and start writing.
                </p>
              </div>
              <div className="mt-10 w-[45rem] overflow-hidden rounded-sm bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                <img
                  alt=""
                  width="2174"
                  height="1464"
                  decoding="async"
                  data-nimg="1"
                  className="w-full"
                  style={{ color: "transparent" }}
                  sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                  src="/assets/howItWorks/extract-your-literature.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
