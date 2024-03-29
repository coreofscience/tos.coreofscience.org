import Reference from "../tree/Reference";
import CoreOfScience from "../vectors/CoreOfScience";
import FacebookIcon from "../vectors/FacebookIcon";
import GitHubIcon from "../vectors/GitHubIcon";
import TwitterIcon from "../vectors/TwitterIcon";
import YoutubeIcon from "../vectors/YoutubeIcon";
import NavBar from "./NavBar";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-4 py-16 md:gap-8">
      <div className="md:fancy-areas grid grid-cols-[1fr] gap-4 md:gap-12">
        <section className="md:area-cite flex flex-col gap-2">
          <h4 className="font-tall text-xl uppercase text-root">
            Citing Tree of Science
          </h4>
          <ul className="flex flex-col gap-2">
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
            <li>
              <Reference
                label=""
                authors={[
                  "Zuluaga, M.",
                  "Robledo, S.",
                  "Osorio-Zuluaga, G. A",
                  "Yathe, L.",
                  "González, D.",
                  "Taborda, G.",
                ]}
                year={2016}
                title="Metabolomics and pesticides: systematic literature review usinggraph theory for analysis of references."
                journal="Nova"
                volume="14"
                issue="25"
                page="121-138"
                doi="10.22490/24629448.1735"
                simple={false}
              />
            </li>
            <li>
              <Reference
                label=""
                authors={["Robledo, S.", "Osorio, G.", "López, C."]}
                year={2014}
                title="Networking en pequeña empresa: una revisión bibliográfica utilizando la teoria de grafos."
                journal="Revista vínculos"
                volume="11"
                issue="2"
                page="6-16"
                doi="10.14483/2322939X.9664"
                simple={false}
              />
            </li>
          </ul>
        </section>
        <section className="md:area-social flex flex-col gap-2">
          <h4 className="font-tall text-xl uppercase text-root">
            Social media
          </h4>
          <ul className="flex flex-row gap-2">
            <li>
              <a
                href="https://github.com/coreofscience/"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <GitHubIcon />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/coreofscience"
                target="_blank"
                rel="noopener noreferrer"
                title="facebook"
              >
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCgFXO_IbFGkZRyj6heWpEBw"
                target="_blank"
                rel="noopener noreferrer"
                title="youtube"
              >
                <YoutubeIcon />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/core_of_science"
                target="_blank"
                rel="noopener noreferrer"
                title="twitter"
              >
                <TwitterIcon />
              </a>
            </li>
          </ul>
        </section>
        <section className="md:area-git flex flex-col gap-2">
          <h4 className="font-tall text-xl uppercase text-root">
            This project on GitHub
          </h4>
          <ul>
            <li>
              <a
                href="https://github.com/coreofscience/sap.coreofscience.com"
                className="text-sky-600 transition-colors ease-in hover:text-sky-800 active:text-sky-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                front-end
              </a>
            </li>
            <li>
              <a
                href="https://github.com/coreofscience/gcloud-tos"
                className="text-sky-600 transition-colors ease-in hover:text-sky-800 active:text-sky-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                back-end
              </a>
            </li>
            <li>
              <a
                href="https://github.com/coreofscience/python-bibx"
                className="text-sky-600 transition-colors ease-in hover:text-sky-800 active:text-sky-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                algorithms
              </a>
            </li>
          </ul>
        </section>
      </div>
      <div className="flex flex-row items-center gap-2">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://coreofscience.com"
        >
          <CoreOfScience className="h-10 w-10" />
        </a>
        <span>
          A{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://coreofscience.com"
          >
            Core of Science
          </a>{" "}
          project. &copy; 2020 Core of Science.
        </span>
      </div>
      <div className="flex sm:justify-center">
        <ul className="flex flex-col sm:flex-row sm:gap-4 lg:gap-8">
          {location.pathname === "/" && <NavBar origin="footer" />}
          <li>
            <Link
              className="text-sky-600 hover:text-sky-800 active:text-sky-800"
              to="/docs/sap"
            >
              Your tree explained
            </Link>
          </li>
          <li>
            <Link
              className="text-sky-600 hover:text-sky-800 active:text-sky-800"
              to="/docs/faq"
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              className="text-sky-600 hover:text-sky-800 active:text-sky-800"
              to="/docs/about"
            >
              About ToS
            </Link>
          </li>
          <li>
            <Link
              className="text-sky-600 hover:text-sky-800 active:text-sky-800"
              to="/docs/press"
            >
              Press Release
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
