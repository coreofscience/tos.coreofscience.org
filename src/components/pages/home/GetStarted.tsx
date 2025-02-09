import Button from "../../ui/Button";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <section className="container mx-auto max-w-7xl">
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-8 text-center">
        <h2 className="text-center font-tall text-3xl sm:text-4xl">
          Your tree explained
        </h2>
        <p className="text-lg">Learn all about the elements of your tree.</p>
        <Button className="uppercase" asChild>
          <Link to="/docs/sap">Learn more</Link>
        </Button>
      </div>
    </section>
  );
};

export default GetStarted;
