import styled from "styled-components";

export const Grid = styled.table`
  width: 95%;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  box-shadow: rgba(238, 130, 238, 0.4) 0px 2px 8px 0px;
`;

export const Row = styled.tr`
  flex-grow: 1;
  display: flex;
  border-radius: var(--border-radius-primary);
  border-bottom: 1px solid rgba(238, 130, 238, 0.9);

  &:first-child {
    border-top: 1px solid rgba(238, 130, 238, 0.9);
  }
`;

export const Col = styled.td`
  flex-grow: 1;
  background: rgba(19, 78, 94, 0.5);
  background: linear-gradient(
    to right,
    rgba(19, 78, 94, 0.8),
    rgba(113, 178, 128, 0.8)
  );
  background: ${(props) => (props.dead ? "none" : null)};
  border-radius: var(--border-radius-primary);
  border-right: 1px solid rgba(238, 130, 238, 0.9);
  box-shadow: inset 0.5px 0.5px 10px 0.5px rgba(238, 130, 238, 0.3);

  &:first-child {
    border-left: 1px solid rgba(238, 130, 238, 0.9);
  }
`;

export const CellButton = styled.button`
  height: 100%;
  width: 100%;
`;
