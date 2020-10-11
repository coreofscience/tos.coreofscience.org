import React from "react";
import CoreOfScience from "../vectors/CoreOfScience";

import "./Footer.css";

const Footer = () => (
  <div className="footer">
    <div className="footer__mainLinks">
      <section className="footer__section">
        <h4 className="footer__sectionHeader">This project on GitHub</h4>
        <ul className="footer__sectionLinks social">
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
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/coreofscience"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/channel/UCgFXO_IbFGkZRyj6heWpEBw"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/core_of_science"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
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
