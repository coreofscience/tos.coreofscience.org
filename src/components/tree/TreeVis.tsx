import { FC, useEffect, useMemo, useRef } from "react";
import { useMeasure } from "react-use";
import {
  select,
  forceSimulation,
  forceManyBody,
  forceCollide,
  forceX,
  forceY,
} from "d3";

import { ArticleWithMetrics, Section, TreeResult } from "../../types/result";

import "./TreeVis.css";

interface Props {
  treeResult: TreeResult;
}

const sectionToCenter = (section: Section, height: number) => {
  switch (section) {
    case "root":
      return (5 * height) / 6;
    case "trunk":
      return (3.5 * height) / 6;
    case "leaf":
      return (1.5 * height) / 6;
  }
};

const articlesToData = (
  articles: ArticleWithMetrics[],
  section: Section,
  width: number,
  height: number
) => {
  const radii = articles.map((article) => article[section]);
  const maxRadius = Math.max(...radii);
  const minRadius = Math.min(...radii);
  return articles.map((article) => ({
    className: section,
    r: ((article[section] - minRadius) / (maxRadius - minRadius)) * 15 + 8,
    cx: width / 2,
    cy: Math.random() * height,
    centerY: sectionToCenter(section, height),
    article: article,
  }));
};

const treeSectionToData = (
  treeSections: TreeResult,
  width: number,
  height: number
) => {
  const data = [];
  for (let section in treeSections) {
    if (section === "branch") {
      continue;
    }
    data.push(
      ...articlesToData(
        treeSections[section as Section],
        section as Section,
        width,
        height
      )
    );
  }
  return data;
};

export const TreeVis: FC<Props> = ({ treeResult: treeSections }) => {
  const svgRef = useRef(null);
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();

  const data = useMemo(
    () => treeSectionToData(treeSections, width, height),
    [treeSections, width, height]
  );

  useEffect(() => {
    if (svgRef.current === null) return;
    const svg = select(svgRef.current);
    const nodes = data.map((d) => ({ x: d.cx, y: d.cy, radius: d.r, ...d }));
    const simulation = forceSimulation(nodes)
      .force("charge", forceManyBody().strength(5))
      .force(
        "y",
        forceY().y((d) => (d as any).centerY)
      )
      .force("x", forceX().x(width / 2))
      .force(
        "collide",
        forceCollide().radius((d) => (d as any).radius + 5)
      )
      .on("tick", () => {
        svg
          .selectAll("circle")
          .data(nodes)
          .join(
            (enter) =>
              enter
                .append("circle")
                .attr("class", (v) => v.className)
                .attr("r", (v) => v.r)
                .attr("cx", (v) => v.x)
                .attr("cy", (v) => v.x)
                .attr("title", (v) => v.article.label)
                .on("click", (event, node) => {
                  console.log(event, node);
                }),
            (update) =>
              update
                .attr("class", (v) => v.className)
                .attr("r", (v) => v.r)
                .attr("cx", (v) => v.x)
                .attr("cy", (v) => v.y)
                .attr("title", (v) => v.article.label),
            (exit) => exit.remove()
          );
      });
    return () => {
      simulation.stop();
    };
  }, [data, width]);

  return (
    <div className="TreeVis" ref={ref}>
      <svg ref={svgRef} />
    </div>
  );
};
