import styled from "styled-components";

const TreeSegment = styled.div<{ className: "root" | "trunk" | "leaf" }>`
  --color: 245, 162, 0;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;

  &.root {
    --color: 245, 162, 0;
  }
  &.trunk {
    --color: 130, 77, 30;
  }
  &.leaf {
    --color: 76, 172, 51;
  }

  & .info {
    width: 50px;
  }

  & .articles {
    flex-grow: 1;
    margin-left: 1em;
  }
`;

export default TreeSegment;
