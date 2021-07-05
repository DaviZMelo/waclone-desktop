import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  .ReactCollapse--collapse {
    transition: height 500ms;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(45deg)
  }
  to {
    transform: rotate(0deg);
  }
`;

export const Header = styled.div`
  button {
    width: 100%;
    outline: none;

    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: white;
    border: 2px solid black;

    padding: 14px 16px;
    border-radius: 16px;

    color: black;

    > svg {
      margin-left: 8px;
      color: black;
      animation: ${rotate} 200ms;
    }
  }
`;
export const Content = styled.div`
  padding: 8px;
  font-size: 15px;
  font-weight: bold;

  div,
  p {
    white-space: pre-wrap;
  }
`;
