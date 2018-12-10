import React from 'react';
import styled from 'styled-components';
import { List, ListComponent } from './styles/List';

const DescriptionContainer = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const Paragraph = styled.p`
  margin-top: 1.5rem;
`;

const Description = () => (
  <DescriptionContainer>
    <h3>Rules</h3>
    <List>
      <ListComponent>
        Any live cell with fewer than two live neighbors dies, as if by
        underpopulation.
      </ListComponent>
      <ListComponent>
        Any live cell with two or three live neighbors lives on to the next
        generation.
      </ListComponent>
      <ListComponent>
        Any live cell with more than three live neighbors dies, as if by
        overpopulation.
      </ListComponent>
      <ListComponent>
        Any dead cell with exactly three live neighbors becomes a live cell, as
        if by reproduction.
      </ListComponent>
    </List>
    <Paragraph>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi expedita
      architecto ducimus cumque magni distinctio voluptate soluta. Quos
      reiciendis quasi totam, nam delectus necessitatibus itaque quia nulla illo
      rem repudiandae?
    </Paragraph>
  </DescriptionContainer>
);

export default Description;
