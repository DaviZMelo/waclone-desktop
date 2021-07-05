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

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

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

  input {
    flex: 1;
    background: transparent;
    border: 0;
    font-size: 18px;
    outline: none;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
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
