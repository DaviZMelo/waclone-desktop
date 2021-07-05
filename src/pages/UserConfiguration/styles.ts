import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface MasterUserButtonProps {
  isMasterUser: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const AllowedUsersList = styled.main`
  height: 100%;

  > input {
    margin-top: 48px;
  }

  h2 {
    text-align: center;
    margin-bottom: 18px;
  }

  ul {
    min-height: 250px;
    list-style: none;

    li {
      & + li {
        margin-top: 16px;
      }
    }
  }
`;

export const InputField = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;

  input {
    user-select: none;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid black;
    font-size: 18px;
    outline: none;
  }

  button {
    margin-left: 12px;

    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: 1px solid black;
    border-radius: 8px;
    padding: 10px;
    outline: none;

    cursor: pointer;

    svg {
      width: 25px;
      height: 25px;
    }

    &:hover {
      background-color: ${shade(0.2, '#FFF')};
      transition: 0.2s;
    }
  }
`;

export const MasterUserButton = styled.button<MasterUserButtonProps>`
  margin-left: 0;
  margin-right: 12px;
  ${props =>
    !props.isMasterUser &&
    css`
      opacity: 0.2;
    `}
`;
