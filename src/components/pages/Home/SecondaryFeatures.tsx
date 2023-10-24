import { FC, useCallback, useState } from "react";

enum Section {
 Reporting=  "REPORTING",
 Inventory = "INVENTORY",
 Contacts = "CONTACTS",
}

const SecondaryFeatures: FC = () => {
 const [show, setShow] = useState<Section>(Section.Reporting);

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
   id="secondary-features"
   aria-label="Features for simplifying everyday business tasks"
  >
   <div className="mx-auto w-[80vw] max-w-7xl sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl md:text-center">
     <h2 className="text-3xl font-tall sm:text-4xl">Simplify everyday business tasks</h2>
     <p className="mt-4 text-lg">Because you’d probably be a little confused if we suggested you complicate your everyday business tasks instead.</p>
    </div>

    {/*Block that hides in lg. This is the block for small devices*/}
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
     <div>
      <div className="mx-auto max-w-2xl">
       <div className="w-9 bg-leaf">
        <svg aria-hidden="true" className="h-9 w-9" fill="none">
         <defs>
          <linearGradient id=":R2mella:" x1="11.5" y1="18" x2="36" y2="15.5" gradientUnits="userSpaceOnUse">
           <stop offset=".194" stopColor="#fff"></stop>
           <stop offset="1" stopColor="#6692F1"></stop>
          </linearGradient>
         </defs>
         <path d="m30 15-4 5-4-11-4 18-4-11-4 7-4-5" stroke="url(#:R2mella:)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
       </div>
       <h3 className="mt-6 text-sm font-medium text-leaf">Reporting</h3>
       <p className="mt-2 text-xl">Stay on top of things with always up-to-date reporting features.</p>
       <p className="mt-4 text-sm text-slate-600">We talked about reporting in the section above but we needed three items here, so mentioning it one more time for posterity.</p>
      </div>
      <div className="relative mt-10 pb-10">
       <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-100 sm:-inset-x-6"></div>
       <div className="relative mx-auto w-[52.75rem] overflow-hidden bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
        <img
         alt=""
         loading="lazy"
         width="1688"
         height="856"
         decoding="async"
         data-nimg="1"
         className="w-full text-transparent"
         sizes="52.75rem"
         src="/profit-loss.webp"
        />
       </div>
      </div>
     </div>
     <div>
      <div className="mx-auto max-w-2xl">
       <div className="w-9 bg-leaf">
         <svg aria-hidden="true" className="h-9 w-9" fill="none">
          <path opacity=".5" d="M8 17a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z" fill="#fff"></path>
          <path opacity=".3" d="M8 24a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z" fill="#fff"></path>
          <path d="M8 10a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z" fill="#fff"></path>
        </svg>
       </div>
       <h3 className="mt-6 text-sm font-medium text-leaf">Inventory</h3>
       <p className="mt-2 text-xl">Never lose track of what’s in stock with accurate inventory tracking.</p>
       <p className="mt-4 text-sm text-slate-600">We don’t offer this as part of our software but that statement is inarguably true. Accurate inventory tracking would help you for sure.</p>
      </div>
      <div className="relative mt-10 pb-10">
       <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-100 sm:-inset-x-6"></div>
       <div className="relative mx-auto w-[52.75rem] overflow-hidden bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
        <img
         alt=""
         loading="lazy"
         width="1688"
         height="856"
         decoding="async"
         data-nimg="1"
         className="w-full text-transparent"
         sizes="52.75rem"
         src="/inventory.webp"
        />
       </div>
      </div>
     </div>
     <div>
      <div className="mx-auto max-w-2xl">
       <div className="w-9 bg-leaf">
        <svg aria-hidden="true" className="h-9 w-9" fill="none">
         <path
          opacity=".5"
          d="M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z"
          fill="#fff"
         >
         </path>
         <path
          d="M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z"
          fill="#fff"
         >
         </path>
        </svg>
       </div>
       <h3 className="mt-6 text-sm font-medium text-leaf">Contacts</h3>
       <p className="mt-2 text-xl">Organize all of your contacts, service providers, and invoices in one place.</p>
       <p className="mt-4 text-sm text-slate-600">This also isn’t actually a feature, it’s just some friendly advice. We definitely recommend that you do this, you’ll feel really organized and professional.</p>
      </div>
      <div className="relative mt-10 pb-10">
       <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-100 sm:-inset-x-6"></div>
       <div className="relative mx-auto w-[52.75rem] overflow-hidden bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
        <img
         alt=""
         loading="lazy"
         width="1688"
         height="856"
         decoding="async"
         data-nimg="1"
         className="w-full text-transparent"
         sizes="52.75rem"
         src="/contacts.webp"
        />
       </div>
      </div>
     </div>
    </div>

    {/*Block shown in lg. This is the block for large devices*/}
    <div className="hidden lg:mt-20 lg:block">
     <div className="grid grid-cols-3 gap-x-8" role="tablist" aria-orientation="horizontal">
      <div className={`relative ${show !== Section.Reporting ? "opacity-75 hover:opacity-100" : ""}`}>
       <div className={`w-9 ${show === Section.Reporting ? "bg-leaf" : "bg-slate-500"}`}>
        <svg aria-hidden="true" className="h-9 w-9" fill="none">
         <defs>
          <linearGradient id=":Rarella:" x1="11.5" y1="18" x2="36" y2="15.5" gradientUnits="userSpaceOnUse">
           <stop offset=".194" stopColor="#fff"></stop>
           <stop offset="1" stopColor="#6692F1"></stop>
          </linearGradient>
         </defs>
         <path
          d="m30 15-4 5-4-11-4 18-4-11-4 7-4-5"
          stroke="url(#:Rarella:)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
         >
         </path>
        </svg>
       </div>
       <h3 className={`mt-6 text-sm font-medium ${show === Section.Reporting ? "text-leaf" : "text-slate-600"}`}>
        <button
         className="ui-not-focus-visible:outline-none"
         id="headlessui-tabs-tab-:Rirella:"
         role="tab"
         type="button"
         aria-selected="true"
         tabIndex={0}
         data-headlessui-state="selected"
         aria-controls="headlessui-tabs-panel-:Rbbella:"
         onClick={() => toggleShow(Section.Reporting)}
        >
         <span className="absolute inset-0"></span>
         Reporting
        </button>
       </h3>
       <p className="mt-2 text-xl">Stay on top of things with always up-to-date reporting features.</p>
       <p className="mt-4 text-sm text-slate-600">We talked about reporting in the section above but we needed three items here, so mentioning it one more time for posterity.</p>
      </div>
      <div className={`relative ${show !== Section.Inventory ? "opacity-75 hover:opacity-100" : ""}`}>
       <div className={`w-9 ${show === Section.Inventory ? "bg-leaf" : "bg-slate-500"}`}>
        <svg aria-hidden="true" className="h-9 w-9" fill="none">
         <path
          opacity=".5"
          d="M8 17a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z"
          fill="#fff"
         >
         </path>
         <path
          opacity=".3"
          d="M8 24a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z"
          fill="#fff"
         >
         </path>
         <path
          d="M8 10a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z"
          fill="#fff"
         >
         </path>
        </svg>
       </div>
       <h3 className={`mt-6 text-sm font-medium ${show === Section.Inventory ? "text-leaf" : "text-slate-600"}`}>
        <button
         className="ui-not-focus-visible:outline-none"
         id="headlessui-tabs-tab-:Rkrella:"
         role="tab"
         type="button"
         aria-selected="false"
         tabIndex={-1}
         data-headlessui-state=""
         aria-controls="headlessui-tabs-panel-:Rjbella:"
         onClick={() => toggleShow(Section.Inventory)}
        >
         <span className="absolute inset-0"></span>
         Inventory
        </button>
       </h3>
       <p className="mt-2 text-xl">Never lose track of what’s in stock with accurate inventory tracking.</p>
       <p className="mt-4 text-sm text-slate-600">We don’t offer this as part of our software but that statement is inarguably true. Accurate inventory tracking would help you for sure.</p>
      </div>
      <div className={`relative ${show !== Section.Contacts ? "opacity-75 hover:opacity-100" : ""}`}>
       <div className={`w-9 ${show === Section.Contacts ? "bg-leaf" : "bg-slate-500"}`}>
        <svg aria-hidden="true" className="h-9 w-9" fill="none">
         <path
          opacity=".5"
          d="M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z"
          fill="#fff"
         >
         </path>
         <path
          d="M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z"
          fill="#fff"
         >
         </path>
        </svg>
       </div>
       <h3 className={`mt-6 text-sm font-medium ${show === Section.Contacts ? "text-leaf" : "text-slate-600"}`}>
        <button
         className="ui-not-focus-visible:outline-none"
         id="headlessui-tabs-tab-:Rmrella:"
         role="tab"
         type="button"
         aria-selected="false"
         tabIndex={-1}
         data-headlessui-state=""
         aria-controls="headlessui-tabs-panel-:Rrbella:"
         onClick={() => toggleShow(Section.Contacts)}
        >
         <span className="absolute inset-0"></span>
         Contacts
        </button>
       </h3>
       <p className="mt-2 text-xl">Organize all of your contacts, service providers, and invoices in one place.</p>
       <p className="mt-4 text-sm text-slate-600">This also isn’t actually a feature, it’s just some friendly advice. We definitely recommend that you do this, you’ll feel really organized and professional.</p>
      </div>
     </div>

     {/*Carousel of images*/}
     <div className="relative mt-20 overflow-hidden bg-slate-100 px-14 py-16 xl:px-16">
      <div className="-mx-5 flex">
       <div
        className={`px-5 transition duration-500 ease-in-out ui-not-focus-visible:outline-none ${show !== Section.Reporting ? "opacity-60" : ""}`}
        style={show === Section.Reporting ? {transform: "translateX(0%)"} : show === Section.Contacts ? {transform: "translateX(-200%)"} : {transform: "translateX(-100%)"}}
        aria-hidden={show !== Section.Reporting}
        id="headlessui-tabs-panel-:Rbbella:"
        role="tabpanel"
        tabIndex={0}
        data-headlessui-state="selected"
        aria-labelledby="headlessui-tabs-tab-:Rirella:"
       >
        <div className="w-[52.75rem] overflow-hidden bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
         <img
          alt=""
          loading="lazy"
          width="1688"
          height="856"
          decoding="async"
          data-nimg="1"
          className="w-full text-transparent"
          sizes="52.75rem"
          src="/profit-loss.webp"
         />
        </div>
       </div>
       <div
        className={`px-5 transition duration-500 ease-in-out ui-not-focus-visible:outline-none ${show !== Section.Inventory ? "opacity-60" : ""}`}
        style={show === Section.Inventory ? {transform: "translateX(-100%)"} : show === Section.Reporting ? {transform: "translateX(0%)"} : {transform: "translateX(-200%)"}}
        aria-hidden={show !== Section.Inventory}
        id="headlessui-tabs-panel-:Rjbella:"
        role="tabpanel"
        tabIndex={-1}
        data-headlessui-state=""
        aria-labelledby="headlessui-tabs-tab-:Rkrella:"
       >
        <div className="w-[52.75rem] overflow-hidden bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
         <img
          alt=""
          loading="lazy"
          width="1688"
          height="856"
          decoding="async"
          data-nimg="1"
          className="w-full text-transparent"
          sizes="52.75rem"
          src="/inventory.webp"
         />
        </div>
       </div>
       <div
        className={`px-5 transition duration-500 ease-in-out ui-not-focus-visible:outline-none ${show !== Section.Contacts ? "opacity-60" : ""}`}
        style={show === Section.Contacts ? {transform: "translateX(-200%)"} : show === Section.Inventory ? {transform: "translateX(-100%)"} : {transform: "translateX(0%)"}}
        aria-hidden={show !== Section.Contacts}
        id="headlessui-tabs-panel-:Rrbella:"
        role="tabpanel"
        tabIndex={-1}
        data-headlessui-state=""
        aria-labelledby="headlessui-tabs-tab-:Rmrella:"
       >
        <div className="w-[52.75rem] overflow-hidden bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
         <img
          alt=""
          loading="lazy"
          width="1688"
          height="856"
          decoding="async"
          data-nimg="1"
          className="w-full text-transparent"
          sizes="52.75rem"
          src="/contacts.webp"
         />
        </div>
       </div>
      </div>
      <div className="pointer-events-none absolute inset-0"></div>
     </div>
    </div>
   </div>
  </section>
 );
};

export default SecondaryFeatures;
