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
  background: rgba(70, 70, 70, .7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 20;
`;

export const ModalBody = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  padding: 30px;
  background: #134e5e; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #134e5e, #71b280); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #134e5e, #71b280); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border: 1px solid rgba(238,130,238, .9);
  border-radius: 3px;
  z-index: 30;
  text-align: center;
  h1 {
    font-size: 4.5rem;
    color: #222;
    text-shadow: 1px 1px 8px rgba(238,130,238, .4);
  }
  h2 {
    font-size: 3.5rem;
    color: #222;
    text-shadow: 1px 1px 8px rgba(238,130,238, .4);
  }
  p {
    line-height: 28px;
    font-size: 2rem;
    color: #222;
    text-shadow: 1px 1px 8px rgba(238,130,238, .4);
  }
  ul {
    list-style: none;
  }
  li {
    line-height: 23px;
    font-size: 1.7rem;
    color: #222;
    text-shadow: 1px 1px 8px rgba(238,130,238, .4);
  }
  button {
    position: absolute;
    top: 1.5%;
    right: 1%;
    font-family: 'Space Mono', monospace;
    font-size: 2rem;
    color: rgba(248,205,218, .8);
    text-shadow: 1px 1px 8px rgba(238,130,238, .1);
    padding: 5px 10px;
    background-color: #434343;
    border-radius: 3px;
    border: none;
    border-bottom: 1px solid rgba(238,130,238, .9);
    border-top: 1px solid rgba(238,130,238, .9);
    border-left: 1px solid rgba(238,130,238, .9);
    &:last-child {
      border-right: 1px solid rgba(238,130,238, .9);
    }
    box-shadow: .5px .5px 10px .5px rgba(238,130,238, .3);
    &:hover {
      cursor: pointer;
      background: #134e5e; /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #134e5e, #2a5f6e); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #134e5e, #2a5f6e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
  }
  main {
    margin-top: 45px;
    display: flex;
    section {
      width: 50%;
      p {
        text-align: left;
        margin-top: 30px;
      }
      li {
        text-align: left;
        margin-top: 10px;
        &:first-child {
          margin-top: 15px;
        }
      }
    }
  }
`;
