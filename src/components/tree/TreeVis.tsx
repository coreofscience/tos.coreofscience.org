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

import {
  ArticleWithMetrics,
  ResultSection,
  ArticleSection,
  TreeResult,
} from "../../types/result";

import "./TreeVis.css";

interface Props {
  treeResult: TreeResult;
}

const articlesToData = (
  articles: ArticleWithMetrics[],
  section: ArticleSection,
  width: number,
  height: number
) => {
  const radii = articles.map((article) => {
    if (section === "branch_1" || section === "branch_2" || section === "branch_3") {
      return article.branch
    }
    return article[section]
  });
  const maxRadius = Math.max(...radii);
  const minRadius = Math.min(...radii);
  const centerY = {
    leaf: (1.5 * height) / 6,
    branch_1: (2.8 * height) / 6,
    branch_2: (2.5 * height) / 6,
    branch_3: (2.8 * height) / 6,
    trunk: (4 * height) / 6,
    root: (5 * height) / 6,
  };
  const centerX = {
    leaf: width / 2,
    branch_1: (0.7 * width) / 2,
    branch_2: (width) / 2,
    branch_3: (1.3 * width) / 2,
    trunk: width / 2,
    root: width / 2,
  };
  return articles.map((article) => {
    let r: number;
    if (section === "branch_1" || section === "branch_2" || section === "branch_3") {
      r = 8;
    } else {
      r = section === "leaf"
        ? ((article[section] - minRadius) / (maxRadius - minRadius)) * 15 + 12
        : ((article[section] - minRadius) / (maxRadius - minRadius)) * 10 + 8;
    }
    return {
      className: section,
      r,
      cx: width / 2,
      cy: Math.random() * height,
      centerY: centerY[section],
      centerX: centerX[section],
      article: article,
    }
  });
};

const treeSectionToData = (
  treeSections: TreeResult,
  width: number,
  height: number
) => {
  const data = [];
  for (const section in treeSections) {
    data.push(
      ...articlesToData(
        treeSections[section as ResultSection],
        section as ArticleSection,
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
      .force(
        "x",
        forceX().x((d) => (d as any).centerX)
      )
      .force(
        "collide",
        forceCollide().radius((d) => (d as any).radius + 2)
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
                .attr("cy", (v) => v.y)
                .attr("title", (v) => v.article.label),
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
