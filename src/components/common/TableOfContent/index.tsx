import { FC } from "react";
import { Heading } from "../../../types/tableOfContent";

type Props = {
  headings: Heading[];
};

const TableOfContent: FC<Props> = ({ headings }) => {
  return (
    <div className="prose prose-stone">
      <ul>
        {headings.map((heading) => {
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
                className={
                  "text-sky-600 underline-offset-2 hover:text-sky-800" +
                  paddingClass
                }
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TableOfContent;
