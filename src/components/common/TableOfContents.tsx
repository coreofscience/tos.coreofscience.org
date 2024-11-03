import { FC } from "react";

type Heading = {
  text: string;
  level: number;
  id: string;
};

const headingData: Heading[] = [
  {
    level: 2,
    text: "Roots",
    id: "info-on-roots",
  },
  {
    level: 2,
    text: "Trunk",
    id: "info-on-trunk",
  },
  {
    level: 2,
    text: "Branches",
    id: "info-on-branches",
  },
  {
    level: 2,
    text: "Leaves",
    id: "info-on-leaves",
  },
  {
    level: 2,
    text: "SAP Algorithm",
    id: "info-on-sap-algorithm",
  },
];

const TableOfContents: FC = () => {
  return (
    <div className="prose prose-stone">
      <ul>
        {headingData.map((heading) => {
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

export default TableOfContents;
