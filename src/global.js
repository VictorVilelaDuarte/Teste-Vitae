import { createGlobalStyle } from 'styled-components';
import bgImage from './assets/bg.jpg';

export default createGlobalStyle`
*{
  margin: 0;
  padding:0;
  outline: 0;
  box-sizing: border-box;
}
*:focus{
  outline: 0;
  }
  html, body, #root{
    max-height: 100vh;
  }
  body{
    background-image: url(${bgImage});
    -webkit-font-smoothing: antialiased;
  }

  button{
    cursor: pointer;
  }
`;
