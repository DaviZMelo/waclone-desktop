import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';

interface ButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
}

const loadingAnimation = keyframes`
  0%, 20% {
    content: '.';
  }
  40% {
    content: '..';
  }

  60% {
    content: '...';
  }

  100% {
    content: '';
  }
`;

export const ButtonContainer = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: none;
  border: 1px solid black;
  padding: 14px;
  border-radius: 20px;
  font-size: 16px;
  outline: none;
  cursor: pointer;

  &:hover {
    transition: background-color 200ms;

    background-color: ${shade(0.1, '#fff')};
  }

  svg {
    margin-right: 8px;
  }

  ${props =>
    props.disabled &&
    css`
      background-color: ${shade(0.1, '#fff')};
      cursor: not-allowed;
    `}

  ${props =>
    props.isLoading &&
    css`
      &:after {
        content: '';
        animation: ${loadingAnimation} 2s linear infinite;
      }

      cursor: progress;
    `}
`;
