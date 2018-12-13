import styled from 'styled-components';

export const Grid = styled.main`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-height: 600px;
  height: 550px;
  margin: 0 auto;
`;

export const Row = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 1.3px;
`;

export const Col = styled.article`
  border: .2px solid rgba(238,130,238, .9);
  border-bottom: none;
  &:not(:last-child) {
    border-right: none;
  }
  border-radius: 3px;
  margin-right: .1%;
  box-shadow: .5px .5px 10px .5px rgba(238,130,238, .3);
  height: 100%;
  width: 100%;
  background: rgba(29,43,100, .3); /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, rgba(29,43,100, .3), rgba(248,205,218, .3)); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, rgba(29,43,100, .3), rgba(248,205,218, .3)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  background: ${props => props.dead ? "none" : null};
`;
