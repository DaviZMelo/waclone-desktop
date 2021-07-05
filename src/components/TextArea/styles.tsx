import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: transparent;
  border-radius: 10px;
  padding: 16px;
  min-width: 100%;
  min-height: 100%;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  flex-direction: column;

  & + div {
    margin-top: 10px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #a3a3a3;
      border-color: #a3a3a3;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #000;
    `}

  textarea {
    font-family: 'Roboto Slab';

    flex: 1;
    height: 100%;
    background: transparent;
    border: 0;
    font-size: 18px;
    font-weight: 500;
    outline: none;
    resize: none;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin: 6px auto 18px auto;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: -20px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #ffff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
