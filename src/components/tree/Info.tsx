import styled from "styled-components";

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

export default Info;
