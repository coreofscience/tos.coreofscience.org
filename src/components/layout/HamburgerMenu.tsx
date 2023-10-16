import { useState } from "react";

const HamburgerMenu = () => {
 const [open, setOpen] = useState<boolean>(false);

 return (
  <>
   <div className="flex gap-1 md:gap-4 lg:hidden">
    <button onClick={() => setOpen(!open)} className="relative">
     <div className="relative z-10 flex items-center justify-center w-[50px] h-[50px] transform">
      <div className="flex flex-col justify-around w-[20px] h-[20px] transform overflow-hidden">
       <div className={`bg-leaf h-[2.5px] w-7 transform ${open && "translate-x-10"}`}></div>
       <div className={`bg-leaf h-[2.5px] w-7 transform ${open && "translate-x-10"}`}></div>
       <div className={`bg-leaf h-[2.5px] w-7 transform ${open && "translate-x-10"}`}></div>

       <div className={`absolute items-center justify-between transform top-2.5 -translate-x-10 flex ${open ? "translate-x-0 w-12" : "w-0"}`}>
        <div className={`absolute bg-leaf h-[2.5px] w-5 transform rotate-0 ${open && "rotate-45"}`}></div>
        <div className={`absolute bg-leaf h-[2.5px] w-5 transform -rotate-0 ${open && "-rotate-45"}`}></div>
       </div>
      </div>
     </div>
    </button>
   </div>
   {open && (
    <div>
     <div
      className="fixed inset-0 bg-slate-300/50 opacity-100"
      id="headlessui-popover-overlay-:r9i:"
      aria-hidden="true"
      data-headlessui-state="open"
      onClick={() => setOpen(!open)}
     >
     </div>
     <div
      className="absolute z-10 inset-x-0 mt-10 container flex flex-col bg-white p-4 text-black shadow-md"
     >
      <a
       className="block w-full p-2"
       data-headlessui-state="open"
       href="#testimonials"
       onClick={() => setOpen(!open)}
      >
       Testimonials
      </a>
      <a
       className="block w-full p-2"
       data-headlessui-state="open"
       href="#pricing"
       onClick={() => setOpen(!open)}
      >
       Pricing
      </a>
     </div>
    </div>
   )}
  </>
 );
};

export default HamburgerMenu;
