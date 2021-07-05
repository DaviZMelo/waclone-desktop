import styled, { css } from 'styled-components';

interface ICharactersCount {
  isInLimit: boolean;
}

export const Container = styled.main`
  form {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > button {
      margin-top: 24px;
      font-size: 20px;
    }
  }
`;

export const LinkSwitch = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  h2 {
    margin-bottom: 12px;
  }

  margin-bottom: 24px;
`;

export const TypeLinkMessage = styled.div`
  > h2 {
    margin-bottom: 12px;
  }
  textarea {
    cursor: auto;
    min-height: 12vh;
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
  }
`;

export const CharactersCount = styled.h4<ICharactersCount>`
  ${props =>
    props.isInLimit &&
    css`
      color: red;
    `}
  margin-top: 12px;
`;
