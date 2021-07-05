import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const ConfigList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  a {
    text-decoration: none;
    width: 200px;
    height: 100px;

    button {
      display: flex;
      width: 100%;
      height: 100%;

      padding: 14px;
      font-size: 30px;
    }
  }
`;
