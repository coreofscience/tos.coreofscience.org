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

const Reference = styled.button`
  transition: background 0.5s ease;
  box-shadow: 0 3px 5px -5px black;
  margin-top: 5px;
  padding: 15px;
  width: calc(100% - 30px);
  border-left: 5px solid rgb(var(--color));
  position: relative;

  &::after {
    content: ' ';
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

    &:hover::after {
      transform: scale(1, 1);
    }
    &:hover {
      background-color: rgba(var(--color), 0.1);
    }
  }
`;
const ReferenceDoi = styled.div`
  text-decoration: none;
  color: lightseagreen;
  filter: brightness(60%);
  transition: all 0.5 ease-in-out;

  &:hover {
    filter: brightness(90%);
  }
`;

export { Tree, TreeSegment, Info, Reference, ReferenceDoi };
