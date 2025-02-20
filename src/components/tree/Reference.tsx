import { Article } from "../../types/article";
import Button from "../ui/Button";
import { FC, Fragment } from "react";

const titleCase = (sentence: string): string =>
  sentence
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const formatAuthors = (simple: boolean, authors: string[]): string => {
  const cleanAuthors = (simple ? authors.slice(0, 1) : authors).map(
    (author) =>
      `${author
        .split(".")
        .filter((s) => !!s)
        .join(". ")}.`,
  );
  const [last, ...first] = [...cleanAuthors].reverse();
  return [first.reverse().join("; "), last].filter((s) => !!s).join(" & ");
};

const Reference: FC<Article & { simple?: boolean }> = ({
  label,
  permalink,
  authors,
  year,
  title,
  journal,
  volume,
  issue,
  page,
  doi,
  simple = true,
}) => {
  return (
    <div id={label} className="grow">
      {!!authors && (
        <Fragment>
          <span>{formatAuthors(simple, authors)}</span>{" "}
        </Fragment>
      )}
      {!!year && (
        <Fragment>
          <span>({year})</span>
          {". "}
        </Fragment>
      )}
      {!!title && (
        <Fragment>
          <span className="font-bold">{title}</span>{" "}
        </Fragment>
      )}
      {(!!journal || !!volume) && (
        <Fragment>
          <em>
            {!!journal && <span>{titleCase(journal)}</span>}
            {!!journal && !!volume && (
              <Fragment>
                {", "}
                <span>{volume}</span>
              </Fragment>
            )}
          </em>
          {!!issue && <span>({issue})</span>}
          {!!page && (
            <Fragment>
              {", "}
              <span>{page}</span>
            </Fragment>
          )}

          {". "}
        </Fragment>
      )}
      {permalink ? (
        <Button size="link" variant="link" asChild>
          <a href={permalink} target="_blank" rel="noopener noreferrer">
            {permalink}
          </a>
        </Button>
      ) : (
        !!doi && (
          <Button size="link" variant="link" asChild>
            <a
              href={`https://dx.doi.org/${doi}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {simple ? doi : `https://dx.doi.org/${doi}`}
            </a>
          </Button>
        )
      )}
    </div>
  );
};

export default Reference;
