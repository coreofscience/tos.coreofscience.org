import { FC, useCallback, useState } from "react";

enum Section {
 PlantSeeds = "PLANT_SEEDS",
 BuildTree = "BUILD_TREE",
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
   aria-label="Features for running your books"
   className="relative overflow-hidden"
  >
   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
    <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
     <h2 className="font-tall text-3xl sm:text-4xl md:text-5xl">
      Everything you need to run your literature search
     </h2>
     <p className="mt-6 text-lg">
      Well everything you need if you don't want to do your literature
      search manually.
     </p>
    </div>
    <div className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
     <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
      <div
       className="relative z-10 flex gap-x-1 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal"
       role="tablist"
      >
       <div
        className={`group relative px-4 py-1 lg:p-6 ${show === Section.PlantSeeds
          ? "bg-slate-200/80"
          : "hover:bg-slate-400/10 lg:hover:bg-slate-400/10"
         }`}
        onClick={() => toggleShow(Section.PlantSeeds)}
       >
        <h3>
         <button
          className="text-lg ui-not-focus-visible:outline-none"
          role="tab"
          type="button"
          tabIndex={show === Section.PlantSeeds ? 0 : -1}
         >
          <span className="absolute inset-0"></span>
          Plant your seeds
         </button>
        </h3>
        <p className="mt-2 hidden text-sm lg:block text-slate-900 group-hover:text-slate-900">
         Look up your topic on Scopus or Web of Science and import your
         data into the Tree of Science application.
        </p>
       </div>
       <div
        className={`group relative px-4 py-1 lg:p-6 ${show === Section.BuildTree
          ? "bg-slate-200/80"
          : "hover:bg-slate-400/10 lg:hover:bg-slate-400/10"
         }`}
        onClick={() => toggleShow(Section.BuildTree)}
       >
        <h3>
         <button
          className="text-lg ui-not-focus-visible:outline-none"
          role="tab"
          type="button"
          tabIndex={show === Section.BuildTree ? 0 : -1}
         >
          <span className="absolute inset-0"></span>
          Build your tree
         </button>
        </h3>
        <p className="mt-2 hidden text-sm lg:block text-slate-800 group-hover:text-slate-900">
         Build your Tree of Science with the most modern algoritms and
         analyze your data on the fly.
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
        <p className="relative mx-auto max-w-2xl text-base sm:text-center">
         Look up your topic on Scopus or Web of Science and import your
         data into the Tree of Science application.
        </p>
       </div>
       <div className="mt-10 w-[45rem] overflow-hidden bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
        <img
         alt=""
         width="2174"
         height="1464"
         decoding="async"
         data-nimg="1"
         className="w-full"
         style={{ color: "transparent" }}
         sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
         src="/assets/features/plant-seeds.png"
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
        <p className="relative mx-auto max-w-2xl text-base sm:text-center">
         Build your Tree of Science with the most modern algoritms and
         analyze your data on the fly.
        </p>
       </div>
       <div className="mt-10 w-[45rem] overflow-hidden bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
        <img
         alt=""
         width="2174"
         height="1464"
         decoding="async"
         data-nimg="1"
         className="w-full"
         style={{ color: "transparent" }}
         sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
         src="/assets/features/build-tree.png"
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