import styled from 'styled-components';

export const Container = styled.main``;

export const Collapses = styled.aside`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5vw;
`;

export const CollapseList = styled.div`
  h1 {
    text-align: center;
    margin-bottom: 24px;
  }
`;

export const CollapseContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  width: 100%;

  overflow-y: auto;

  max-height: 65vh;

  padding-right: 12px;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: black;
  }

  button {
    cursor: pointer;
  }
`;
