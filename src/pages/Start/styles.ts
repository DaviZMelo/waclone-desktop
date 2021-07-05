import styled, { keyframes } from 'styled-components';

interface StartButtonProps {
  isAllowedToStart: boolean;
}

const rotate = keyframes`
  from {
    transform: rotate(45deg)
  }
  to {
    transform: rotate(0deg);
  }
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StartContainer = styled.div<StartButtonProps>`
  button {
    margin-top: 80px;
    width: 400px;
    height: 200px;

    font-size: 50px;
  }

  h4 {
    text-align: center;
    margin-top: 8px;
  }
`;

export const StartModalContent = styled.main`
  ul {
    li {
      cursor: pointer;
      user-select: none;
      button {
        font-size: 18px;
      }
      & + li {
        margin-top: 5vh;
      }

      list-style: none;
      font-size: 20px;
      display: flex;
      align-items: center;

      svg {
        margin-left: 12px;
        margin-right: 12px;
        animation: ${rotate} 200ms;
      }
    }
  }
`;

export const ModalFooter = styled.footer`
  position: fixed;
  bottom: 20px;
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  button {
    font-size: 28px;
    width: 30%;
    height: 70px;

    margin: 0 48px;
  }
`;

export const SendContactModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  button {
    font-size: 32px;
    width: 400px;
    height: 120px;

    margin-top: 14px;
  }
`;
