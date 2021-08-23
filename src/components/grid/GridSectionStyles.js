import styled from "styled-components";

export const Grid = styled.table`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-height: 600px;
  height: 550px;
  margin: 0 auto;
`;

export const Row = styled.tr`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 1px;
`;

export const Col = styled.td`
  border: 0.2px solid rgba(238, 130, 238, 0.9);
  border-bottom: none;
  &:not(:last-child) {
    border-right: none;
  }
  border-radius: 3px;
  margin-right: 1px;
  box-shadow: 0.5px 0.5px 10px 0.5px rgba(238, 130, 238, 0.3);
  height: 100%;
  width: 100%;
  background: rgba(19, 78, 94, 0.5); /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    rgba(19, 78, 94, 0.8),
    rgba(113, 178, 128, 0.8)
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    rgba(19, 78, 94, 0.8),
    rgba(113, 178, 128, 0.8)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  &:hover {
    cursor: pointer;
  }
  background: ${(props) => (props.dead ? "none" : null)};
`;
