import { FC, useEffect, useRef } from "react";
import { Article } from "../../types/article";

import { select } from "d3";

interface Props {
  treeSections: { [section: string]: Article[] };
}

export const TreeVis: FC<Props> = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current === null) return;
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data([1, 2, 3])
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("class", "new")
            .attr("r", (v) => v)
            .attr("cx", (v) => v * 10)
            .attr("cy", (v) => v * 10)
            .attr("fill", "red"),
        (update) =>
          update
            .attr("class", "updated")
            .attr("r", (v) => v)
            .attr("cx", (v) => v * 10)
            .attr("cy", (v) => v * 10)
            .attr("fill", "red"),
        (exit) => exit.remove()
      );
  }, []);

  return <svg ref={svgRef} />;
};
