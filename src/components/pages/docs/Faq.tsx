import Reference from "../../tree/Reference";
import { FC, useEffect } from "react";

const Faq: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section aria-labelledby="faq-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 id="faq-title" className="font-tall text-3xl sm:text-4xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-lg sm:text-xl">
            If you can’t find what you’re looking for, email our support team
            and someone will get back to you.
          </p>
        </div>
        <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          <li>
            <ul className="flex flex-col gap-y-8">
              <li className="flex flex-col gap-2">
                <h2 className="font-tall text-xl">
                  What is the Tree of Science?
                </h2>
                <p>
                  Tree of Science is an innovative web-based platform designed
                  to simplify and enhance your literature review process.
                  Leveraging the power of network analysis, this tool delves
                  into the complex citation relationships between academic
                  papers. By sourcing bibliographic data from well-known
                  repositories such as Web of Science and Scopus, Tree of
                  Science provides you with an insightful graphical
                  representation of a document's scholarly context. This enables
                  you to swiftly identify key papers that are foundational to
                  the subject matter, saving you time and effort while enriching
                  your understanding of the research landscape.
                </p>
              </li>
              <li className="flex flex-col gap-2">
                <h2 className="font-tall text-xl">
                  Who is the Tree of Science intended for?
                </h2>
                <p>
                  The Tree of Science is designed primarily for researchers,
                  academics, and scholars across various disciplines who are
                  looking to navigate the vast landscape of scientific
                  literature. Whether you're a seasoned researcher seeking to
                  identify seminal papers in a new field or a graduate student
                  looking for a comprehensive overview of existing work relevant
                  to your thesis, the Tree of Science offers a visually
                  intuitive and academically rigorous way to explore and
                  understand the scientific knowledge in your area of interest.
                  It can also be a valuable tool for librarians, journal
                  editors, and research organizations aiming to curate and
                  analyze research contributions effectively.
                </p>
              </li>
              <li className="flex flex-col gap-2">
                <h2 className="font-tall text-xl">
                  Is Tree of Science Open Source?
                </h2>
                <p>
                  Yes, Tree of Science is both free and open-source software.
                  You can access our source code through the CoreofScience
                  organization on GitHub. This enables you to review the code,
                  contribute to its development, or even build upon it for your
                  own projects.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <ul className="flex flex-col gap-y-8">
              <li className="flex flex-col gap-2">
                <h2 className="font-tall text-xl">
                  How do I cite Tree of Science in my research?
                </h2>
                <p>
                  To cite Tree of Science in your academic work, you can use the
                  following format in accordance with the APA citation style:
                </p>
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
              <li className="flex flex-col gap-2">
                <h2 className="font-tall text-xl">
                  Where Can I Access In-Depth Information About the Tree of
                  Science Algorithm?
                </h2>
                <p>
                  For those interested in delving into the mechanics of the Tree
                  of Science algorithm, we've published a comprehensive paper.
                  Titled "SAP Algorithm for Citation Analysis: An Improvement to
                  Tree of Science," the paper offers a thorough explanation,
                  drawing parallels between the flow of nutrients in a
                  biological tree and the flow of intellectual influence in
                  scientific research. You can read the paper for a full
                  understanding of the algorithm{" "}
                  <a
                    href="http://dx.doi.org/10.15446/ing.investig.v40n1.77718"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-600 hover:text-sky-800"
                  >
                    here
                  </a>
                  .
                </p>
              </li>
              <li className="flex flex-col gap-2">
                <h2 className="font-tall text-xl">
                  Is Using Tree of Science Free?
                </h2>
                <p>
                  Absolutely, Tree of Science offers a variety of plans to suit
                  different needs, with free options available. Our basic plan
                  allows users to upload files up to 5MB without the need for
                  registration. For larger file sizes, we offer a second free
                  plan that accommodates up to 10MB—registration is required for
                  this plan. We're also excited to announce that we will soon be
                  launching a paid plan that supports files up to 100MB and
                  includes additional scientometric features.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <ul className="flex flex-col gap-y-8">
              <li className="flex flex-col gap-2">
                <h2 className="font-tall text-xl">
                  What is the Meaning of Each Section of the Tree of Science?
                </h2>
                <p>
                  The Tree of Science visualizes the landscape of scientific
                  research through various components:
                </p>
                <ul className="mt-2 list-disc text-sm">
                  <li>
                    <strong>Roots</strong>: These are seminal papers that serve
                    as foundational works in a field. They are origin points for
                    other works but don't refer to any other foundational works.
                  </li>
                  <li>
                    <strong>Trunk</strong>: This section includes enduring
                    theories or methods, acting as a bridge between foundational
                    works and new research.
                  </li>
                  <li>
                    <strong>Branches</strong>: These are distinct subfields or
                    specialized areas, identified through advanced clustering
                    techniques, connecting various areas within a field.
                  </li>
                  <li>
                    <strong>Leaves</strong>: These represent the latest
                    research, considered the cutting-edge contributions to the
                    field, generally less than or equal to 5 years old.
                  </li>
                </ul>
                <p>
                  Together, these elements provide a comprehensive view of the
                  intellectual lineage and current state of a particular
                  scientific domain.
                </p>
              </li>
              <li className="flex flex-col gap-2">
                <h2 className="font-tall text-xl">
                  Can we expect more inventory features?
                </h2>
                <p>
                  In life it’s really better to never expect anything at all.
                </p>
              </li>
              <li className="flex flex-col gap-2">
                <h2 className="font-tall text-xl">
                  Do you have any tutorials or guides?
                </h2>
                <p>
                  Certainly! For hands-on guidance and practical demonstrations
                  on how to use Tree of Science, we have a dedicated YouTube
                  channel. You can access various tutorials and video guides to
                  help you get the most out of our tool. Visit our YouTube
                  channel at{" "}
                  <a
                    href="https://www.youtube.com/@CoreofScience/videos"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-600 hover:text-sky-800"
                  >
                    Tree of Science Tutorials
                  </a>{" "}
                  to explore our educational content. Whether you're a
                  first-time user or looking to explore advanced features, our
                  channel has something for everyone.
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Faq;
