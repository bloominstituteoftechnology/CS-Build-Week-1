import styled from "styled-components";
import { Button } from "../../GlobalStyles";

export const Section = styled.section`
  width: 90%;
  margin: 0 auto;
`;

export const RulesButton = styled(Button)`
  width: 100%;
  max-width: 350px;
`;

export const RulesGroup = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style-type: square;
  list-style-position: inside;
`;
