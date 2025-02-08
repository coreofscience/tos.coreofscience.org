import Button from "../ui/Button";

type Heading = {
  text: string;
  id: string;
};

const headingData: Heading[] = [
  {
    text: "Roots",
    id: "info-on-roots",
  },
  {
    text: "Trunk",
    id: "info-on-trunk",
  },
  {
    text: "Branches",
    id: "info-on-branches",
  },
  {
    text: "Leaves",
    id: "info-on-leaves",
  },
  {
    text: "SAP Algorithm",
    id: "info-on-sap-algorithm",
  },
];

const TableOfContents = () => {
  return (
    <div className="prose prose-stone">
      <ul>
        {headingData.map((heading) => (
          <li key={heading.id}>
            <Button variant="link" size="link" asChild>
              <a href={`#${heading.id}`}>{heading.text}</a>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
