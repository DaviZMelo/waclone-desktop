import styled, { css } from 'styled-components';

interface ModalProps {
  width?: number;
  height?: number;
}

export const Container = styled.div`
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Content = styled.main`
  height: 94%;
  overflow-y: auto;
  word-wrap: break-word;
  padding: 12px;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: black;
  }
`;

export const ModalBox = styled.div<ModalProps>`
  > svg {
    cursor: pointer;
  }

  border-radius: 12px;
  padding: 24px;
  box-shadow: 1px 4px 8px #a3aba3;

  background-color: white;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  ${props => css`
    width: ${props.width}%;
    height: ${props.height}%;
  `}
`;
