import { FC } from "react";
import UnderlinedIcon from "../../vectors/UnderlinedIcon";
import PlayIcon from "../../vectors/PlayIcon";

const Hero: FC = () => {
 return (
  <div className="flex gap-8 flex-col">
   <div className="flex gap-8 justify-center items-center">
    <div className="flex flex-col gap-4 max-w-4xl items-center justify-center">
     <h1 className="font-tall text-center max-w-4xl font-display text-5xl tracking-tight text-slate-900 sm:text-7xl">Accounting <span className="relative whitespace-nowrap text-leaf"><UnderlinedIcon /><span className="relative">made simple</span></span> for small businesses.</h1>
     <p className="text-center mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.</p>
    </div>
   </div>
   <div className="flex justify-center gap-3">
    <a
     href="mailto:technology@coreofscience.org"
     className="px-4 py-2 font-tall uppercase font-bold text-slate-50 bg-leaf"
    >
     Contact us
    </a>
    <a
     href="https://www.youtube.com/@CoreofScience/videos"
     target="_blank"
     className="inline-flex items-center justify-center px-4 py-2 font-tall uppercase font-bold text-slate-50 bg-root"
    >
     <PlayIcon />
     <span className="ml-3">Watch videos</span>
    </a>
   </div>
  </div>
 );
};

export default Hero;
