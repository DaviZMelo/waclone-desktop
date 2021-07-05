import { createGlobalStyle, keyframes } from 'styled-components';

const animation = keyframes`
    0% {
      opacity: 0.7;
    }
    100% {
     opacity: 1;
    }
`;

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    animation: 0.4s ${animation} ease-out;

  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #000;
    padding: 0 8px;

    
    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: black;
    }


  }
`;
