import React, { useEffect, useRef, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import ContentLoader from 'styled-content-loader';
import Loading from '../../components/Loading';
import Title from '../../components/Title';
import api from '../../services/api';

import Dashboard from '../../templates/Dashboard';
import { Container, LogsContainer, TableTitles, LogsContent } from './styles';

interface IlogsList {
  date: string;
  message: string;
}

const LogsConfiguration: React.FC = () => {
  const [isLoading] = useState(false);
  const firstUpdate = useRef(true);
  const [logsList, setLogsList] = useState<Array<IlogsList>>([]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;

      api.get('/admin/logs').then(response => {
        setLogsList(response.data);
      });
    }
  }, []);

  return (
    <>
      <Loading isLoading={isLoading} />
      <Dashboard>
        <Container>
          <Title icon={FiSettings}>Registros</Title>
          <LogsContainer>
            <table>
              <TableTitles>
                <tr>
                  <th>Registro</th>
                  <th>Data</th>
                </tr>
              </TableTitles>
              <LogsContent>
                {logsList.length ? (
                  <>
                    {logsList.map((log, index) => (
                      <tr key={index}>
                        <td>{log.message}</td>
                        <td>{log.date}</td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    {Array.from(Array(3), (_, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <ContentLoader key={index}>
                              <h1>...</h1>
                            </ContentLoader>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </LogsContent>
            </table>
          </LogsContainer>
        </Container>
      </Dashboard>
    </>
  );
};

export default LogsConfiguration;
