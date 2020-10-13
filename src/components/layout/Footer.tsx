import React from "react";
import CoreOfScience from "../vectors/CoreOfScience";
import GitHubIcon from "../vectors/GitHubIcon";
import FacebookIcon from "../vectors/FacebookIcon";
import YoutubeIcon from "../vectors/YoutubeIcon";
import TwitterIcon from "../vectors/TwitterIcon";
import Reference from "../tree/Reference";

import "./Footer.css";

const Footer = () => (
  <div className="footer">
    <div className="footer__mainLinks">
      <section className="footer__section citationLinks">
        <h4 className="footer__sectionHeader">Citing Tree of Science</h4>
        <ul className="footer__sectionLinks citations">
          <li>
            <Reference
              label=""
              authors={[
                "Valencia-Hernandez, D. S.",
                "Robledo, S.",
                "Pinilla, R.",
                "Duque-Méndez, N. D.",
                "Olivar-Tost, G.",
              ]}
              year={2020}
              title="Algoritmo SAP para análisis de citaciones: Una mejora al Árbol de la Ciencia"
              journal="Ingeniería E Investigación"
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
                "Gonzalez, D.",
                "Taborda, G.",
              ]}
              year={2016}
              title="Metabolomics and pesticides: systematic literature review usinggraph theory for analysis of references"
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
              authors={["Robledo, S.", "Osorio, G.", "Lopez, C."]}
              year={2020}
              title="Networking en pequeña empresa: una revisión bibliográfica utilizando la teoria de grafos"
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
      <section className="footer__section socialLinks">
        <h4 className="footer__sectionHeader">Social media</h4>
        <ul className="footer__sectionLinks social">
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
      <section className="footer__section repoLinks">
        <h4 className="footer__sectionHeader">This project on GitHub</h4>
        <ul className="footer__sectionLinks">
          <li>
            <a
              href="https://github.com/coreofscience/sap.coreofscience.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              front-end
            </a>
          </li>
          <li>
            <a
              href="https://github.com/coreofscience/gcloud-tos"
              target="_blank"
              rel="noopener noreferrer"
            >
              back-end
            </a>
          </li>
          <li>
            <a
              href="https://github.com/coreofscience/python-wostools"
              target="_blank"
              rel="noopener noreferrer"
            >
              parser
            </a>
          </li>
          <li>
            <a
              href="https://github.com/coreofscience/python-sap"
              target="_blank"
              rel="noopener noreferrer"
            >
              graph algorithms
            </a>
          </li>
        </ul>
      </section>
    </div>
    <div className="footer__copy">
      <CoreOfScience />
      <span>
        A <a href="https://coreofscience.com">Core of Science</a> project.
        &copy; 2020 Core of Science.
      </span>
    </div>
  </div>
);

export default Footer;
