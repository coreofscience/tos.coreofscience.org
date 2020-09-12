import React, { FC, Fragment } from "react";
import styled from "styled-components";

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
}

const titleCase = (sentence: string): string =>
  sentence
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const ReferenceWrapper = styled.div`
  transition: background 0.5s ease;
  box-shadow: 0 3px 5px -5px black;
  margin-top: 5px;
  padding: 15px;
  width: calc(100% - 30px);
  border-left: 5px solid rgb(var(--color));
  position: relative;

  &::after {
    content: " ";
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border-top: 2.5px solid transparent;
    border-bottom: 2.5px solid transparent;
    border-left: 2.5px solid rgb(var(--color));
    left: 0px;
    top: calc(50% - 2.5px);
    transition: transform 0.5s ease-in-out;
    transform-origin: 0 50%;
    transform: scale(0, 0);
  }

  &:hover::after {
    transform: scale(1, 1);
  }

  &:hover {
    background-color: rgba(var(--color), 0.1);
  }

  & .doi {
    text-decoration: none;
    color: lightseagreen;
    filter: brightness(60%);
    transition: all 0.5 ease-in-out;
  }

  & .doi:hover {
    filter: brightness(90%);
  }
`;

const Reference: FC<Props> = ({
  label,
  authors,
  year,
  title,
  journal,
  volume,
  issue,
  page,
  doi,
}: Props) => (
  <ReferenceWrapper id={label}>
    {!!authors && (
      <Fragment>
        <span className="authors">
          {authors.map((author) => `${author.replace(".", "")}.`).join("; ")}
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
        <span className="tittle">{title}</span>
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
        {`https://dx.doi.org/${doi}`}
      </a>
    )}
  </ReferenceWrapper>
);

export default Reference;
