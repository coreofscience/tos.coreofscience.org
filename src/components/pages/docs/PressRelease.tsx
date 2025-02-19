import { useEffect } from "react";

const PresRelease = () => {
  useEffect(() => {
    if (window) {
      window.scrollTo(0, 0);
    }
  });

  return (
    <article className="prose prose-stone m-auto prose-a:text-sky-600 hover:prose-a:text-sky-800 active:prose-a:text-sky-800">
      <p>
        Contact: Oscar Arbelaez
        <br />
        Email:{" "}
        <a href="mailto:director@coreofscience.org">
          director@coreofscience.org
        </a>
        <br />
        Date: <time dateTime="2024-02-05">February, 5, 2024</time>
      </p>

      <h1 className="text-center">
        Revolutionizing Academic Literature Search: Tree of Science Unveils New
        Algorithm for Instant Research Insights
      </h1>

      <blockquote>
        <p>
          Within minutes Tree of Science identifies and maps relevant academic
          literature for every research subject.
        </p>
      </blockquote>

      <p>
        <strong>
          Valledupar, Colombia –{" "}
          <time dateTime="2024-02-05">February 5, 2024</time>
        </strong>{" "}
        - <a href="https://tos.coreofscience.org">Tree of Science</a>, an
        integrated web-based platform is revolutionizing the landscape of
        academic literature search. Its innovative algorithm radically expedites
        the identification and mapping of scientific publications, freeing up
        time for researchers in all fields of study.
      </p>

      <p>
        Tree of Science empowers researchers to significantly reduce the time
        and complexity associated with reviewing and analyzing relevant
        publications in their study area, streamlining the crucial initial
        stages of research processes.
      </p>

      <p>
        Visualizing the knowledge field as a tree, Tree of Science categorizes
        the works into roots, trunks, branches, and leaves.
      </p>

      <h2>How Tree of Science works in detail:</h2>

      <ol>
        <li>
          <strong>Immediate File Upload “Tree Planting”</strong> – Researchers
          can create a query listing all publications related to their research
          topic through Web of Science and Scopus. This query is then uploaded
          to Tree of Science.
        </li>
        <li>
          <strong>Analysis of connected theories “Tree Growing”</strong> - By
          uploading the query results to Tree of Science, a tree is generated,
          identifying relevant key publications in a specific research field.
        </li>
        <li>
          <p>
            <strong>Visualization of relevant theories “Final Tree”</strong> -
            The algorithm structures each publication’s relevance into the
            tree’s components within minutes.
          </p>
          <p>
            The roots encompass foundational works or seminal papers, the trunk
            represents fundational theories or methods that have stood the test
            of time, the branches signify subfields or specialized areas of
            research, and the leaves showcase most recent, cutting-edge research
            in a field.
          </p>

          <p>
            By selecting certain literary works, the tree adjusts dynamically.
          </p>
        </li>
        <li>
          <strong>Extraction of the literature summary</strong> – Depending on
          their Tree of Science subscription, researchers can download their
          literature list and commence writing their paper.
        </li>
      </ol>

      <p>
        Sebastian Robledo, Founder and Director of Tree of Science, states,
        "Tree of Science is a game-changer in the world of academic research. By
        leveraging advanced technologies, we are empowering researchers to
        navigate the vast landscape of academic literature with unprecedented
        speed and precision. The platform is easy to handle and does not require
        any specialized skills or applications beyond a web browser and internet
        access."
      </p>

      <p>
        Tree of Science’s Basic Version is available for free and allows
        downloads of up to 10 MB file size and limits the search history to the
        last three searches. The Pro Version is available for $10/month,
        offering up to 100 MB in literature summaries and unlimited search
        history.
      </p>
      <p>
        <em>
          For more information about Tree of Science and its capabilities,
          please visit:{" "}
          <a href="https://tos.coreofscience.org">
            https://tos.coreofscience.org
          </a>
          .
        </em>
      </p>

      <h2>About Tree of Science:</h2>

      <p>
        Tree of Science is a pioneering division of Core of Science, a
        non-profit organization dedicated to advancing science and data science
        education among undergraduate and graduate students. Our mission is to
        inspire and nurture growth in these vital fields, fostering a new
        generation of scientific thinkers and data analysts.
      </p>
      <p>
        Tree of Science offers intuitive and powerful visualization and analysis
        capabilities, making complex scientific data accessible and engaging for
        students, upcoming and seasoned researchers as well as academic
        institutions and research organizations.
      </p>
      <p>
        Discover more about Tree of Science at{" "}
        <a href="https://tos.coreofscience.org">
          https://tos.coreofscience.org
        </a>
        .
      </p>
    </article>
  );
};

export default PresRelease;
