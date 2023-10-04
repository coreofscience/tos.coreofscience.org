import { FC } from "react";
import TableOfContent from "../../common/TableOfContent";
import { HeadingData } from "../../common/TableOfContent/constants";

const Sap: FC = () => {
 return (
  <article className="prose prose-stone m-auto max-w-3xl">
   <h1 className="font-tall uppercase">ToS Definitions</h1>
   <TableOfContent headings={HeadingData} />
   <section id="info-on-roots">
    <h2 className="uppercase font-tall text-root">Roots</h2>
    <p>The "Roots" in the Tree of Science algorithm symbolize foundational works or seminal papers in a given field. These are the building blocks upon which subsequent knowledge is constructed. The "roots" are identified as vertices in the graph with zero outdegree, implying that they are the origin points for other works but do not themselves refer to any other foundational works. The top 10 roots based on the "indegree," or the number of citations they receive, are chosen for analysis.</p>
   </section>
   <section id="info-on-trunk">
    <h2 className="uppercase font-tall text-trunk">Trunk</h2>
    <p>The "Trunk" serves as the central column of collective knowledge, consisting of works that are derived from the roots and serve as a passage towards new research avenues. These are generally established theories or methods that have stood the test of time. In the algorithm, the "Trunk" is determined by finding the shortest paths between leaves and roots and analyzing the vertices that lie on these paths. These vertices are sorted by their "antiquity," a measure of how long ago the research was published.</p>
   </section>
   <section id="info-on-branches">
    <h2 className="uppercase font-tall text-branch">Branches</h2>
    <p>To generate the branches of the Tree of Science, our algorithm clusters articles into distinct subfields or specialized areas of research, commonly referred to as "branches." These branches are identified based on the underlying citation network, using advanced network clustering techniques. Once these clusters or "branches" are established, they are integrated into the Tree of Science model. This provides a more granular view of the research landscape, allowing researchers to see not only the foundational works (Roots) and the most current research (Leaves), but also the pivotal contributions that serve as branches connecting various areas of a given field.</p>
   </section>
   <section id="info-on-leaves">
    <h2 className="uppercase font-tall text-leaf">Leaves</h2>
    <p>The "Leaves" represent the most recent, edge-cutting research in a field. These papers are considered as the ones that have not cited other papers but are cited by other papers. The algorithm identifies leaves as vertices with zero "indegree" and sorts them based on their "antiquity," which in this context measures the paper's age relative to the current year. Only those leaves that are less than or equal to 5 years old are considered.</p>
   </section>
   <section id="info-on-sap-algorithm">
    <h2 className="uppercase font-tall text-sky-600">SAP Algorithm</h2>
    <p>The "SAP" algorithm mirrors the nutrient flow in a biological tree, symbolizing the intellectual lineage and influence between research works. The SAPs are computed from the leaves to the roots and serve to identify and sort the leaves based on their 'SAP' value. This SAP metric quantifies the richness of the knowledge pathways that can be traced back to the foundational roots.</p>
    <p>In general, the Tree of Science algorithm is a fascinating blend of biology and network theory to quantify and visualize the evolution of scientific knowledge. It serves to highlight both the lineage and the importance of scientific works within a specific domain.</p>
   </section>
  </article>
 );
};

export default Sap;
