import { useState } from "react";

const HamburgerMenu = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex gap-1 md:gap-4 xl:hidden">
        <button onClick={() => setOpen(!open)} className="relative">
          <div className="relative z-20 flex h-[30px] w-[30px] transform items-center justify-center">
            <div className="flex h-[20px] w-[20px] transform flex-col justify-around overflow-hidden">
              <div
                className={`bg-leaf h-[2.5px] w-7 transform ${
                  open && "translate-x-10"
                }`}
              ></div>
              <div
                className={`bg-leaf h-[2.5px] w-7 transform ${
                  open && "translate-x-10"
                }`}
              ></div>
              <div
                className={`bg-leaf h-[2.5px] w-7 transform ${
                  open && "translate-x-10"
                }`}
              ></div>

              <div
                className={`absolute top-2.5 flex -translate-x-10 transform items-center justify-between ${
                  open ? "w-12 translate-x-0" : "w-0"
                }`}
              >
                <div
                  className={`bg-leaf absolute h-[2.5px] w-5 rotate-0 transform ${
                    open && "rotate-45"
                  }`}
                ></div>
                <div
                  className={`bg-leaf absolute h-[2.5px] w-5 -rotate-0 transform ${
                    open && "-rotate-45"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </button>
      </div>
      {open && (
        <div>
          <div
            className="fixed inset-0 z-10 bg-slate-300/50 opacity-100"
            id="headlessui-popover-overlay-:r9i:"
            aria-hidden="true"
            data-headlessui-state="open"
            onClick={() => setOpen(!open)}
          ></div>
          <div className="absolute inset-x-0 z-10 container mt-10 flex flex-col bg-white p-4 text-black shadow-md">
            <a
              className="block w-full p-2"
              data-headlessui-state="open"
              href="#how-it-works"
              onClick={() => setOpen(!open)}
            >
              How it works
            </a>
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
