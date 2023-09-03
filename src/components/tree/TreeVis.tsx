import { FC, useEffect, useMemo, useRef } from "react";

import {
  select,
  forceSimulation,
  forceManyBody,
  forceCollide,
  forceX,
  forceY,
} from "d3";
import { ArticleWithMetrics, Section, TreeResult } from "../../types/result";

interface Props {
  treeResult: TreeResult;
}

const sectionToColor = (section: Section) => {
  switch (section) {
    case "root":
      return "brown";
    case "trunk":
      return "yellow";
    case "leaf":
      return "green";
  }
};

const sectionToCenter = (section: Section) => {
  switch (section) {
    case "root":
      return 500;
    case "trunk":
      return 300;
    case "leaf":
      return 150;
  }
};

const articlesToData = (articles: ArticleWithMetrics[], section: Section) => {
  const radii = articles.map((article) => article[section]);
  const maxRadius = Math.max(...radii);
  const minRadius = Math.min(...radii);
  const data = articles.map((article) => ({
    className: section,
    r: ((article[section] - minRadius) / (maxRadius - minRadius)) * 10 + 10,
    cx: Math.random() * 100,
    cy: Math.random() * 100,
    centerY: sectionToCenter(section),
    fill: sectionToColor(section),
    article: article,
  }));
  return data;
};

const treeSectionToData = (treeSections: TreeResult) => {
  const data = [];
  for (const section in treeSections) {
    data.push(
      ...articlesToData(treeSections[section as Section], section as Section)
    );
  }
  return data;
};

export const TreeVis: FC<Props> = ({ treeResult: treeSections }) => {
  const svgRef = useRef(null);
  const data = useMemo(() => treeSectionToData(treeSections), [treeSections]);

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
      .force("x", forceX().x(400))
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
                .attr("fill", (v) => v.fill)
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
                .attr("fill", (v) => v.fill)
                .attr("title", (v) => v.article.label),
            (exit) => exit.remove()
          );
      });
    return () => {
      simulation.stop();
    };
  }, [data]);

  return <svg style={{ minHeight: 600 }} ref={svgRef} />;
};
