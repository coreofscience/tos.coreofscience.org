import Button from "../../ui/Button";
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
        <Button className="uppercase" asChild>
          <Link to="/tos">Grow your tree now</Link>
        </Button>
        <Button className="uppercase" asChild>
          <a
            href="https://www.loom.com/share/287b5cfeab214ff08d392ec4ab6de27c"
            target="_blank"
            rel="noreferrer"
          >
            Watch the video
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
