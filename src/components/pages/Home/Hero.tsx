import { FC } from "react";
import { Link } from "react-router-dom";

const Hero: FC = () => {
  return (
    <section className="flex gap-8 flex-col container">
      <div className="flex gap-8 justify-center items-center">
        <div className="flex flex-col gap-4 max-w-4xl items-center justify-center">
          <h2 className="font-tall text-center max-w-4xl text-5xl sm:text-7xl">
            Accelerate your <span className="text-leaf">literature</span> search
          </h2>
          <p className="text-center mx-auto mt-6 max-w-2xl text-lg">
            Within minutes Tree of Science identifies and maps relevant academic
            literature for every research subject.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-2">
        <Link
          to="/tos"
          className="px-4 py-2 font-tall text-center uppercase font-bold text-slate-50 bg-leaf rounded-sm"
        >
          Grow your tree now
        </Link>
        <a
          href="https://www.loom.com/share/287b5cfeab214ff08d392ec4ab6de27c"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 font-tall text-center uppercase font-bold text-slate-50 bg-leaf rounded-sm"
        >
          Watch the video
        </a>
      </div>
    </section>
  );
};

export default Hero;
