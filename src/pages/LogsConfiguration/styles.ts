import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const LogsContent = styled.tbody`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  max-height: 50vh;

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

export const LogsContainer = styled.div`
  margin-top: -20px;
  width: 100%;
  table {
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    padding: 30px;
    width: 80%;
    height: 60vh;

    tr {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    tr {
      display: flex;

      td {
        padding: 18px;
        width: 100%;
        text-align: center;
        justify-content: center;
        font-size: 18px;
      }
    }
  }
`;

export const TableTitles = styled.thead`
  display: flex;
  border-radius: 8px;
  border: 1px solid black;

  tr {
    width: 100%;
  }

  th {
    padding: 18px;
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: 22px;

    & + th {
      border-left: 1px solid black;
    }
  }
`;
