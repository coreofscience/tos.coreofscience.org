import styled from 'styled-components';

const Tree = styled.div`
  width: 100%;
`;

const TreeSegment = styled.div<{ className: 'root' | 'trunk' | 'leaf' }>`
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

const Info = styled.div`
  z-index: 10;
  position: relative;
  top: 10px;
  left: 5px;
  width: 250px;
  background-color: rgb(var(--color));
  padding: 20px;
  border-radius: 20px;
  clip-path: circle(20px at 20px 20px);
  color: white;
  transition: clip-path 0.5s ease-in-out;
  box-shadow: 0 3px 5px -5px black;

  &:hover {
    clip-path: circle(80%);
  }
`;

export { Tree, TreeSegment, Info };
