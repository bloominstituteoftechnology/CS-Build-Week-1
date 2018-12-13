import styled from 'styled-components';


export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
`;

export const Opacity = styled.div`
  background: rgba(215, 215, 215, .8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 20;
`;

export const ModalBody = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  background: white;
  border: 1px solid black;
  z-index: 30;
  text-align: center;

  p {
    font-size: 1.8rem;
    margin-top: 53px;
  }
  div {
    display: flex;
    justify-content: center;
   
    button {
      display: flex;
      margin-top: 38px;
      padding: 18px;
      width: 250px;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      color: white;
      font-size: 2rem;
      font-weight: bold;
      background-color: #2AC0C4;
      border: solid 1px #939797;
      &:hover {
        cursor: pointer;
        background-color: #23a0a4;
      }
    }
    .first {
      margin-right: 20px;
      background-color: red;
    }
  }
`;
