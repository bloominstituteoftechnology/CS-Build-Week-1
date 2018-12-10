import styled from 'styled-components';

const Control = styled.div`
  margin: 1rem auto;
  padding: 20px;
  width: 40%;
`;

const ControlButton = styled.button`
  border: 1px solid grey;
  padding: 10px;
  width: 15%;
  background-color: white;
  margin-right: ${props => (props.last ? '0' : '1rem')};
`;

export { Control, ControlButton };
