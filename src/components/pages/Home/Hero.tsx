import { FC } from "react";
import { Link } from "react-router-dom";

const Hero: FC = () => {
  return (
    <section className="container flex flex-col gap-8">
      <div className="flex items-center justify-center gap-8">
        <div className="flex max-w-4xl flex-col items-center justify-center gap-4">
          <h2 className="max-w-4xl text-center font-tall text-5xl sm:text-7xl">
            Accelerate your <span className="text-leaf">literature</span> search
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg">
            Within minutes Tree of Science identifies and maps relevant academic
            literature for every research subject.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2 sm:flex-row">
        <Link
          to="/tos"
          className="rounded-sm bg-leaf px-4 py-2 text-center font-tall font-bold uppercase text-slate-50"
        >
          Grow your tree now
        </Link>
        <a
          href="https://www.loom.com/share/287b5cfeab214ff08d392ec4ab6de27c"
          target="_blank"
          rel="noreferrer"
          className="rounded-sm bg-leaf px-4 py-2 text-center font-tall font-bold uppercase text-slate-50"
        >
          Watch the video
        </a>
      </div>
    </section>
  );
};

export default Hero;
