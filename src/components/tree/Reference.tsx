import { Fragment } from "react";
import "./Reference.css";

interface Props {
  label: string;
  authors?: string[];
  year?: number | null;
  title?: string | null;
  journal?: string | null;
  volume?: string | null;
  issue?: string | null;
  page?: string | null;
  doi?: string | null;
  simple?: boolean;
}

const titleCase = (sentence: string): string =>
  sentence
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const Reference = ({
  label,
  authors,
  year,
  title,
  journal,
  volume,
  issue,
  page,
  doi,
  simple = true,
}: Props) => (
  <div className="reference" id={label}>
    {!!authors && (
      <Fragment>
        <span className="authors">
          {(simple ? authors.slice(0, 1) : authors)
            .map((author) => `${author.split(".").join("")}.`)
            .join("; ")}
        </span>{" "}
      </Fragment>
    )}
    {!!year && (
      <Fragment>
        <span className="year">({year})</span>
        {". "}
      </Fragment>
    )}
    {!!title && (
      <Fragment>
        <span className="title">{title}</span>
        {". "}
      </Fragment>
    )}
    {(!!journal || !!volume) && (
      <Fragment>
        <em>
          {!!journal && <span className="journal">{titleCase(journal)}</span>}
          {!!journal && !!volume && (
            <Fragment>
              {", "}
              <span className="volume">{volume}</span>
            </Fragment>
          )}
        </em>
        {!!issue && <span className="issue">({issue})</span>}
        {!!page && (
          <Fragment>
            {", "}
            <span className="page">{page}</span>
          </Fragment>
        )}

        {". "}
      </Fragment>
    )}
    {!!doi && (
      <a
        className="doi"
        href={`https://dx.doi.org/${doi}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {simple ? doi : `https://dx.doi.org/${doi}`}
      </a>
    )}
  </div>
);

export default Reference;
