import { FC } from "react";
import Reference from "../../tree/Reference";

const FAQ: FC = () => {
 return (
  <section aria-labelledby="faq-title">
   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl lg:mx-0">
     <h2 className="text-3xl font-tall sm:text-4xl">
      Frequently asked questions
     </h2>
     <p className="mt-4 text-lg">
      If you can’t find what you’re looking for, email our support team and someone will get back to you.
     </p>
    </div>
    <ul role="list" className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
     <li>
      <ul role="list" className="flex flex-col gap-y-8">
       <li>
        <h3 className="text-lg font-tall">What is the Tree of Science?</h3>
        <p className="mt-2 text-sm">
         Tree of Science is an innovative web-based platform designed to simplify and enhance your literature review process. Leveraging the power of network analysis, this tool delves into the complex citation relationships between academic papers. By sourcing bibliographic data from well-known repositories such as Web of Science and Scopus, Tree of Science provides you with an insightful graphical representation of a document's scholarly context. This enables you to swiftly identify key papers that are foundational to the subject matter, saving you time and effort while enriching your understanding of the research landscape.
        </p>
       </li>
       <li>
        <h3 className="text-lg font-tall">
         Who is the Tree of Science intended for?
        </h3>
        <p className="mt-2 text-sm">
         The Tree of Science is designed primarily for researchers, academics, and scholars across various disciplines who are looking to navigate the vast landscape of scientific literature. Whether you're a seasoned researcher seeking to identify seminal papers in a new field or a graduate student looking for a comprehensive overview of existing work relevant to your thesis, the Tree of Science offers a visually intuitive and academically rigorous way to explore and understand the scientific knowledge in your area of interest. It can also be a valuable tool for librarians, journal editors, and research organizations aiming to curate and analyze research contributions effectively.
        </p>
       </li>
       <li>
        <h3 className="text-lg font-tall">Is Tree of Science Open Source?</h3>
        <p className="mt-2 text-sm">
         Yes, Tree of Science is both free and open-source software. You can access our source code through the CoreofScience organization on GitHub. This enables you to review the code, contribute to its development, or even build upon it for your own projects.
        </p>
       </li>
      </ul>
     </li>
     <li>
      <ul role="list" className="flex flex-col gap-y-8">
       <li>
        <h3 className="text-lg font-tall">
         How do I cite Tree of Science in my research?
        </h3>
        <p className="mt-2 text-sm">
         To cite Tree of Science in your academic work, you can use the following format in accordance with the APA citation style:
        </p>
        <p className="mt-2 text-sm">
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
        </p>
       </li>
       <li>
        <h3 className="text-lg font-tall">
         Where Can I Access In-Depth Information About the Tree of Science Algorithm?
        </h3>
        <p className="mt-2 text-sm">
         For those interested in delving into the mechanics of the Tree of Science algorithm, we've published a comprehensive paper. Titled "SAP Algorithm for Citation Analysis: An Improvement to Tree of Science," the paper offers a thorough explanation, drawing parallels between the flow of nutrients in a biological tree and the flow of intellectual influence in scientific research. You can read the paper for a full understanding of the algorithm <a href="http://dx.doi.org/10.15446/ing.investig.v40n1.77718" target="_blank" className="text-sky-600 hover:text-sky-800">here</a>.
        </p>
       </li>
       <li>
        <h3 className="text-lg font-tall">Is Using Tree of Science Free?</h3>
        <p className="mt-2 text-sm">
         Absolutely, Tree of Science offers a variety of plans to suit different needs, with free options available. Our basic plan allows users to upload files up to 5MB without the need for registration. For larger file sizes, we offer a second free plan that accommodates up to 10MB—registration is required for this plan. We're also excited to announce that we will soon be launching a paid plan that supports files up to 100MB and includes additional scientometric features.
        </p>
       </li>
      </ul>
     </li>
     <li>
      <ul role="list" className="flex flex-col gap-y-8">
       <li>
        <h3 className="text-lg font-tall">
         What is the Meaning of Each Section of the Tree of Science?
        </h3>
        <p className="mt-2 text-sm">
         The Tree of Science visualizes the landscape of scientific research through various components:
        </p>
        <ul className="list-disc mt-2 text-sm">
         <li>
          <strong>Roots</strong>: These are seminal papers that serve as foundational works in a field. They are origin points for other works but don't refer to any other foundational works.
         </li>
         <li>
          <strong>Trunk</strong>: This section includes enduring theories or methods, acting as a bridge between foundational works and new research.
         </li>
         <li>
          <strong>Branches</strong>: These are distinct subfields or specialized areas, identified through advanced clustering techniques, connecting various areas within a field.
         </li>
         <li>
          <strong>Leaves</strong>: These represent the latest research, considered the cutting-edge contributions to the field, generally less than or equal to 5 years old.
         </li>
        </ul>
        <p className="mt-2 text-sm">
         Together, these elements provide a comprehensive view of the intellectual lineage and current state of a particular scientific domain.
        </p>
       </li>
       <li>
        <h3 className="text-lg font-tall">Can we expect more inventory features?</h3>
        <p className="mt-2 text-sm">In life it’s really better to never expect anything at all.</p>
       </li>
       <li>
        <h3 className="text-lg font-tall">Do you have any tutorials or guides?</h3>
        <p className="mt-2 text-sm">
         Certainly! For hands-on guidance and practical demonstrations on how to use Tree of Science, we have a dedicated YouTube channel. You can access various tutorials and video guides to help you get the most out of our tool. Visit our YouTube channel at <a href="https://www.youtube.com/@CoreofScience/videos" target="_blank" className="text-sky-600 hover:text-sky-800">Tree of Science Tutorials</a> to explore our educational content. Whether you're a first-time user or looking to explore advanced features, our channel has something for everyone.
        </p>
       </li>
      </ul>
     </li>
    </ul>
   </div>
  </section>
 );
};

export default FAQ;
