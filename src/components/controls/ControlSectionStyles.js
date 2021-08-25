import styled from "styled-components";

export const RadioBox = styled.div`
  position: relative;
  display: flex;
  border-radius: var(--border-radius-primary);
  border: 1px solid rgba(238, 130, 238, 0.9);
  box-shadow: 0.5px 0.5px 10px 0.5px rgba(238, 130, 238, 0.3);

  &:focus-within {
    outline-style: solid;
  }

  label {
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 1);
    color: rgba(248, 205, 218, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: #134e5e;
      background: linear-gradient(
        to right,
        rgba(19, 78, 94, 0.5),
        rgba(113, 178, 128 0.5)
      );
    }

    &.selected {
      background: #134e5e;
      background: linear-gradient(to right, #134e5e, #71b280);
    }
  }

  input {
    position: absolute;
    inset: 0;
    margin: auto;
    z-index: -1;
  }
`;
