import { FC } from "react";
import { Heading } from "../../../types/tableOfContent";

type Props = {
 headings: Heading[];
};

const TableOfContent: FC<Props> = ({headings}) => {
 return (
  <article className="prose prose-stone">
   <h2 className="uppercase font-tall">Table Of Contents</h2>
   <ul>
    {headings.map((heading, index) => {
     const id = heading.id;
     const indentation = {
      3: " pl-2",
      4: " pl-4",
     };
     const level = heading.level as keyof typeof indentation;
     const paddingClass = indentation[level] ?? "";
     return (
      <li key={id}>
       <a
        href={`#${id}`}
        className={"underline-offset-2 hover:opacity-70" + paddingClass}
       >
        {heading.text}
       </a>
      </li>
     );
    })}
   </ul>
  </article>
 );
};

export default TableOfContent;
