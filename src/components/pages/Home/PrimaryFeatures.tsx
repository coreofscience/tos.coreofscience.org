import { FC, useCallback, useState } from "react";

enum Section {
 Payroll=  "PAYROLL",
 ClaimExpenses = "CLAIM_EXPENSES",
 VATHanding = "VAT_HANDING",
 Reporting = "REPORTING",
}

const PrimaryFeatures: FC = () => {
 const [show, setShow] = useState<Section>(Section.Payroll);

 const toggleShow = useCallback((label: Section) => {
  setShow(curr => {
   if (curr === label) {
    return curr
   }
   return label
  })
 }, [])

 return (
  <section
   id="features"
   aria-label="Features for running your books"
   className="relative overflow-hidden"
  >
   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
    <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
     <h2 className="font-tall text-3xl sm:text-4xl md:text-5xl">Everything you need to run your books.</h2>
     <p className="mt-6 text-lg">Well everything you need if you aren’t that picky about minor details like tax compliance.</p>
    </div>
    <div className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
     <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
      <div
       className="relative z-10 flex gap-x-1 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal"
       role="tablist"
      >
       <div
        className={`group relative px-4 py-1 lg:p-6 ${show === Section.Payroll ? "bg-slate-200/80" : "hover:bg-slate-400/10 lg:hover:bg-slate-400/10"}`}
        onClick={() => toggleShow(Section.Payroll)}
       >
        <h3>
         <button
          className="text-lg ui-not-focus-visible:outline-none"
          role="tab"
          type="button"
          tabIndex={show === Section.Payroll ? 0 : -1}
         >
          <span className="absolute inset-0"></span>
          Payroll
         </button>
        </h3>
        <p className="mt-2 hidden text-sm lg:block text-slate-900 group-hover:text-slate-900">Keep track of everyone's salaries and whether or not they've been paid. Direct deposit not supported.</p>
       </div>
       <div
        className={`group relative px-4 py-1 lg:p-6 ${show === Section.ClaimExpenses ? "bg-slate-200/80" : "hover:bg-slate-400/10 lg:hover:bg-slate-400/10"}`}
        onClick={() => toggleShow(Section.ClaimExpenses)}
       >
        <h3>
         <button
         className="text-lg ui-not-focus-visible:outline-none"
         role="tab"
         type="button"
         tabIndex={show === Section.ClaimExpenses ? 0 : -1}
         >
          <span className="absolute inset-0"></span>
          Claim expenses
         </button>
        </h3>
        <p className="mt-2 hidden text-sm lg:block text-slate-800 group-hover:text-slate-900">All of your receipts organized into one place, as long as you don't mind typing in the data by hand.</p>
       </div>
       <div
        className={`group relative px-4 py-1 lg:p-6 ${show === Section.VATHanding ? "bg-slate-200/80" : "hover:bg-slate-400/10 lg:hover:bg-slate-400/10"}`}
        onClick={() => toggleShow(Section.VATHanding)}
       >
        <h3>
         <button
         className="text-lg ui-not-focus-visible:outline-none"
         role="tab"
         type="button"
         tabIndex={show === Section.VATHanding ? 0 : -1}
         >
          <span className="absolute inset-0"></span>
          VAT handling
         </button>
        </h3>
        <p className="mt-2 hidden text-sm lg:block text-slate-800 group-hover:text-slate-900">We only sell our software to companies who don't deal with VAT at all, so technically we do all the VAT stuff they need.</p>
       </div>
       <div
        className={`group relative px-4 py-1 lg:p-6 ${show === Section.Reporting ? "bg-slate-200/80" : "hover:bg-slate-400/10 lg:hover:bg-slate-400/10"}`}
        onClick={() => toggleShow(Section.Reporting)}
       >
        <h3>
         <button
         className="font-display text-lg ui-not-focus-visible:outline-none"
         role="tab"
         type="button"
         tabIndex={show === Section.Reporting ? 0 : -1}
         >
          <span className="absolute inset-0"></span>
          Reporting
         </button>
        </h3>
        <p className="mt-2 hidden text-sm lg:block text-slate-800 group-hover:text-slate-900">Easily export your data into an Excel spreadsheet where you can do whatever the hell you want with it.</p>
       </div>
      </div>
     </div>
     <div className="lg:col-span-7">
      <div
       role="tabpanel"
       tabIndex={show === Section.Payroll ? 0 : -1}
       className={show === Section.Payroll ? "block" : "hidden"}
       hidden={show !== Section.Payroll}
      >
       <div className="relative sm:px-6 lg:hidden">
        <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0"></div>
        <p className="relative mx-auto max-w-2xl text-base sm:text-center">Keep track of everyone's salaries and whether or not they've been paid. Direct deposit not supported.</p>
       </div>
       <div
        className="mt-10 w-[45rem] overflow-hidden bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]"
       >
        <img
         alt=""
         width="2174"
         height="1464"
         decoding="async"
         data-nimg="1"
         className="w-full text-transparent"
         sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
         src="/payroll.webp"
        />
       </div>
      </div>
      <div
       role="tabpanel"
       tabIndex={show === Section.ClaimExpenses ? 0 : -1}
       hidden={show !== Section.ClaimExpenses}
       className={show === Section.ClaimExpenses ? "block" : "hidden"}
      >
       <div className="relative sm:px-6 lg:hidden">
        <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0"></div>
        <p className="relative mx-auto max-w-2xl text-base sm:text-center">All of your receipts organized into one place, as long as you don't mind typing in the data by hand.</p>
       </div>
       <div
        className="mt-10 w-[45rem] overflow-hidden bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]"
       >
        <img
         alt=""
         width="2174"
         height="1464"
         decoding="async"
         data-nimg="1"
         className="w-full text-transparent"
         sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
         src="/expenses.webp"
        />
       </div>
      </div>
      <div
       role="tabpanel"
       tabIndex={show === Section.VATHanding ? 0 : -1}
       className={show === Section.VATHanding ? "block" : "hidden"}
       hidden={show !== Section.VATHanding}
      >
       <div className="relative sm:px-6 lg:hidden">
        <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0"></div>
        <p className="relative mx-auto max-w-2xl text-base sm:text-center">We only sell our software to companies who don't deal with VAT at all, so technically we do all the VAT stuff they need.</p>
       </div>
       <div
        className="mt-10 w-[45rem] overflow-hidden bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]"
       >
        <img
         alt=""
         width="2174"
         height="1464"
         decoding="async"
         data-nimg="1"
         className="w-full text-transparent"
         sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
         src="/vat-returns.webp"
        />
       </div>
      </div>
      <div
       role="tabpanel"
       tabIndex={show === Section.Reporting ? 0 : -1}
       className={show === Section.Reporting ? "block" : "hidden"}
       hidden={show !== Section.Reporting}
      >
       <div className="relative sm:px-6 lg:hidden">
        <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0"></div>
        <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">Easily export your data into an Excel spreadsheet where you can do whatever the hell you want with it.</p>
       </div>
       <div
        className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]"
       >
        <img
         alt=""
         width="2174"
         height="1464"
         decoding="async"
         data-nimg="1"
         className="w-full text-transparent"
         sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
         src="/reporting.webp"
        />
       </div>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
};

export default PrimaryFeatures;
