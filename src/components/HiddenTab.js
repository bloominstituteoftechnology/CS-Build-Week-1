import styled, { keyframes } from 'styled-components';
 
const showTab = keyframes`
0% {
    height: 0%;
  }
  30%, 100% {
    width: 400px;
  }
  100% {
    height: 100%;
  }
`

 
export const HiddenTab = styled.div`
  display: inline-block;
  width: 100px;
  position: relative;
  animation-name: ${showTab};
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
`
 
export default HiddenTab