import styled from 'styled-components';

export const Main = styled.main`
  min-height: 100vh;
  text-align: center;
  background: #000000; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #000000, #434343); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #000000, #434343); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  h1 {
    font-size: 5rem;
    color: rgba(248,205,218, .7);
    text-shadow: 1px 1px 8px rgba(238,130,238, .7);
  }
`;

export const GenerationSection = styled.section`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  h2{
    font-size: 4rem;
    color: rgba(248,205,218, .7);
    text-shadow: 1px 1px 8px rgba(238,130,238, .7);
  }
`;