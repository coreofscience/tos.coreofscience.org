import React from "react";
import CoreOfScience from "../vectors/CoreOfScience";
import GitHubIcon from "../vectors/GitHubIcon";
import FacebookIcon from "../vectors/FacebookIcon";
import YoutubeIcon from "../vectors/YoutubeIcon";
import TwitterIcon from "../vectors/TwitterIcon";

import "./Footer.css";

const Footer = () => (
  <div className="footer">
    <div>
      <h4 className="footer__sectionHeader">Citing Tree of Science</h4>
      <p>
        If Tree of Science contributes to a project that leads to a scientific
        publication, please acknowledge this fact by citing:
        <ul className="footer__sectionLinks citations">
          <li>
            <a
              target="blank"
              rel="noopener noreferrer"
              href="https://revistas.unal.edu.co/index.php/ingeinv/article/view/77718/0"
            >
              {/* Valencia-Hernandez, D. S., Robledo, S., Pinilla, R., Duque-Méndez,
              N. D., & Olivar-Tost, G. (2020). Algoritmo SAP para análisis de
              citaciones: Una mejora al Árbol de la Ciencia. Ingeniería E
              Investigación, 40(1), 45-49. */}
              Algoritmo SAP para análisis de citaciones: Una mejora al Árbol de
              la Ciencia
            </a>
          </li>
          <li>
            <a
              target="blank"
              rel="noopener noreferrer"
              href="http://www.scielo.org.co/scielo.php?script=sci_arttext&pid=S1794-24702016000100010"
            >
              {/* Zuluaga, Martha, Robledo, Sebastian, Osorio-Zuluaga, German A,
              Yathe, Laura, Gonzalez, Diana, & Taborda, Gonzalo. (2016).
              Metabolomics and pesticides: systematic literature review using
              graph theory for analysis of references. Nova, 14(25), 121-138. */}
              Metabolomics and pesticides: systematic literature review using
              graph theory for analysis of references
            </a>
          </li>
          <li>
            <a
              target="blank"
              rel="noopener noreferrer"
              href="https://revistas.udistrital.edu.co/index.php/vinculos/article/view/9664"
            >
              {/* Robledo, S., Osorio, G., & Lopez, C. (2014). Networking en pequeña
              empresa: una revisión bibliográfica utilizando la teoria de
              grafos. Revista vínculos, 11(2), 6-16. */}
              Networking en pequeña empresa: una revisión bibliográfica
              utilizando la teoria de grafos
            </a>
          </li>
        </ul>
      </p>
    </div>
    <div className="footer__mainLinks">
      <section className="footer__section">
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
      <section className="footer__section">
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
