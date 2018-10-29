import styled from "styled-components";

const Grid = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: #000;
  width: ${props => props.width || 800}px;
  height: ${props => props.height || 600}px;
  background-image: linear-gradient(#333 1px, transparent 1px),
    linear-gradient(90deg, #333 1px, transparent 1px);
  background-size: ${props => props.cellSize || 20}px
    ${props => props.cellSize || 20}px;
`;

export default Grid;
