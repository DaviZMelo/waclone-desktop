import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  user-select: none;
  display: flex;
  align-items: center;

  button {
    background-color: black;
    border: none;
    padding: 8px;
    border-radius: 50%;
    outline: none;
    cursor: pointer;

    &:hover {
      transition: background-color 200ms;
      background-color: ${shade(0.8, '#0000')};
    }

    svg {
      color: white;
      width: 30px;
      height: 30px;
    }
  }

  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    text-align: center;
    font-size: 24px;
    border: 1px solid black;
    outline: none;

    margin: 0 12px;
  }
`;
