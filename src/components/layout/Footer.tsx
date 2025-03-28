import Reference from "../tree/Reference";
import Button from "../ui/Button";
import CoreOfScience from "../vectors/CoreOfScience";
import GitHubIcon from "../vectors/GitHubIcon";
import YoutubeIcon from "../vectors/YoutubeIcon";
import NavBar from "./NavBar";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-4 py-16 md:gap-8">
      <div className="md:fancy-areas grid grid-cols-[1fr] gap-4 md:gap-12">
        <section className="md:area-cite flex flex-col gap-2">
          <h4 className="font-tall text-root text-xl uppercase">
            Citing Tree of Science
          </h4>
          <ul className="flex flex-col gap-2">
            <li>
              <Reference
                label=""
                authors={[
                  "Sebastian Robledo",
                  "Luis Valencia",
                  "Martha Zuluaga",
                  "Oscar Arbelaez Echeverri",
                  "Jorge W. Arboleda Valencia",
                ]}
                year={2024}
                title="tosr: Create the Tree of Science from WoS and Scopus"
                journal="Journal of Scientometric Research"
                volume="13"
                issue="2"
                doi="10.5530/jscires.13.2.36"
                simple={false}
              />
            </li>
            <li>
              <Reference
                label=""
                authors={[
                  "Zuluaga, M.",
                  "Robledo, S.",
                  "Arbelaez-Echeverri, O.",
                  "Osorio-Zuluaga, G.A.",
                  "Duque-Méndez, N.",
                ]}
                year={2022}
                title="Tree of Science - ToS: A web-based tool for scientific literature recommendation. Search less, research more!"
                journal="Issues in Science and Technology Librarianship"
                volume="100"
                doi="10.29173/istl2696"
                simple={false}
              />
            </li>
            <li>
              <Reference
                label=""
                authors={[
                  "Valencia-Hernández, D. S.",
                  "Robledo, S.",
                  "Pinilla, R.",
                  "Duque-Méndez, N. D.",
                  "Olivar-Tost, G.",
                ]}
                year={2020}
                title="Algoritmo SAP para análisis de citaciones: Una mejora al Árbol de la Ciencia."
                journal="Ingeniería e Investigación"
                volume="40"
                issue="1"
                page="45-49"
                doi="10.15446/ing.investig.v40n1.77718"
                simple={false}
              />
            </li>
          </ul>
        </section>
        <section className="md:area-social flex flex-col gap-2">
          <h4 className="font-tall text-root text-xl uppercase">
            Social media
          </h4>
          <ul className="flex min-w-40 flex-row gap-2">
            <li>
              <Button variant="link" size="link" asChild>
                <a
                  href="https://github.com/coreofscience/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                >
                  <GitHubIcon />
                </a>
              </Button>
            </li>
            <li>
              <Button variant="link" size="link" asChild>
                <a
                  href="https://www.youtube.com/channel/UCgFXO_IbFGkZRyj6heWpEBw"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="youtube"
                >
                  <YoutubeIcon />
                </a>
              </Button>
            </li>
          </ul>
        </section>
        <section className="md:area-git flex flex-col gap-2">
          <h4 className="font-tall text-root text-xl uppercase">
            This project on GitHub
          </h4>
          <ul>
            <li>
              <Button variant="link" size="link" asChild>
                <a
                  href="https://github.com/coreofscience/tos.coreofscience.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  front-end
                </a>
              </Button>
            </li>
            <li>
              <Button variant="link" size="link" asChild>
                <a
                  href="https://github.com/coreofscience/gcloud-tos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  back-end
                </a>
              </Button>
            </li>
            <li>
              <Button variant="link" size="link" asChild>
                <a
                  href="https://github.com/coreofscience/python-bibx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  algorithms
                </a>
              </Button>
            </li>
          </ul>
        </section>
      </div>
      <div className="flex flex-row items-center gap-2">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://coreofscience.org"
        >
          <CoreOfScience className="h-10 w-10" />
        </a>
        <span>
          A{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://coreofscience.org"
          >
            Core of Science
          </a>{" "}
          project. &copy; {new Date().getFullYear()} Core of Science.
        </span>
      </div>
      <div className="flex sm:justify-center">
        <ul className="flex flex-col sm:flex-row sm:gap-4 lg:gap-8">
          {location.pathname === "/" && <NavBar origin="footer" />}
          <li>
            <Button variant="link" size="link" asChild>
              <Link to="/docs/sap">Your tree explained</Link>
            </Button>
          </li>
          <li>
            <Button variant="link" size="link" asChild>
              <Link to="/docs/faq">FAQ</Link>
            </Button>
          </li>
          <li>
            <Button variant="link" size="link" asChild>
              <Link to="/docs/about">About ToS</Link>
            </Button>
          </li>
          <li>
            <Button variant="link" size="link" asChild>
              <Link to="/docs/press">Press Release</Link>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
