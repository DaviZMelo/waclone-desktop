import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;

  form {
    display: flex;
    flex-direction: column;

    > button {
      align-self: center;
      margin-top: 120px;
    }
  }
`;

export const Options = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

export const Option = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin-bottom: 12px;
  }
`;
