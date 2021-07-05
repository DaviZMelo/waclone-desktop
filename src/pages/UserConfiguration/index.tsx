import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiSave, FiSettings, FiTrash } from 'react-icons/fi';
import { RiVipCrown2Line } from 'react-icons/ri';
import InputMask from 'react-input-mask';
import ContentLoader from 'styled-content-loader';
import Loading from '../../components/Loading';
import Title from '../../components/Title';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import Dashboard from '../../templates/Dashboard';

import {
  Container,
  AllowedUsersList,
  InputField,
  MasterUserButton,
} from './styles';

const Configurations: React.FC = () => {
  const { addToast } = useToast();
  const [masterUser, setMasterUser] = useState<number>();
  const firstUpdate = useRef(true);

  const [newAllowedUser, setNewAllowedUser] = useState('55');
  const [allowedUsersList, setAllowedUsersList] = useState<Array<number>>([]);
  const [isPostLoading, setIsPostLoading] = useState(false);

  const handleNewMasterUser = useCallback(
    (newMasterUser: number) => {
      const isMasterUserAllowedUser = allowedUsersList.find(
        allowedUser => allowedUser === newMasterUser,
      );

      if (!isMasterUserAllowedUser) {
        addToast({
          title: 'Número master inválido',
          type: 'error',
        });
        return;
      }

      setMasterUser(newMasterUser);

      setIsPostLoading(true);

      api.post(`/admin/users/master?phone=${newMasterUser}`).finally(() => {
        setIsPostLoading(false);
      });
    },
    [allowedUsersList, addToast],
  );

  const handleRemoveAllowedUser = useCallback(
    (allowedUser: Number) => {
      const filteredAllowedUsers = allowedUsersList.filter(
        filteredAllowedUser => filteredAllowedUser !== allowedUser,
      );

      setAllowedUsersList(filteredAllowedUsers);
      setIsPostLoading(true);

      api.post('/admin/users', filteredAllowedUsers).finally(() => {
        setIsPostLoading(false);
      });
    },
    [allowedUsersList],
  );

  const handleAddNewAllowedUser = useCallback(() => {
    const parsedNewAllowedUser = Number(
      newAllowedUser
        .replace('+', '')
        .replace('(', '')
        .replace(')', '')
        .replace('-', '')
        .replace(/_/g, '')
        .replace(/ /g, ''),
    );

    const foundAlreadyExistingAllowedUser = allowedUsersList.find(
      allowedUser => allowedUser === parsedNewAllowedUser,
    );

    if (foundAlreadyExistingAllowedUser) {
      addToast({
        title: 'Usuário já cadastrado.',
        type: 'error',
      });
      return;
    }

    if (allowedUsersList.length >= 3) {
      addToast({
        title: 'Limite máximo de usuários autorizados atingido!',
        type: 'error',
      });
      return;
    }

    if (parsedNewAllowedUser.toString().length !== 13) {
      addToast({
        title: 'Número de telefone inválido.',
        type: 'error',
      });
      return;
    }

    const newAllowedUsersList = allowedUsersList.concat(parsedNewAllowedUser);

    setIsPostLoading(true);

    api
      .post('/admin/users', newAllowedUsersList)
      .then(() => {
        setAllowedUsersList(newAllowedUsersList);
      })
      .finally(() => {
        setIsPostLoading(false);
      });

    setNewAllowedUser('55');
  }, [allowedUsersList, newAllowedUser, addToast]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;

      api.get('/admin/users').then(response => {
        setAllowedUsersList(response.data);
      });

      api.get('/admin/users/master').then(response => {
        setMasterUser(response.data);
      });
    }
  }, [allowedUsersList]);

  return (
    <>
      <Loading isLoading={isPostLoading} />
      <Dashboard>
        <Container>
          <Title icon={FiSettings}>Configurações de usuário</Title>
          <AllowedUsersList>
            <h2>Usuários autorizados</h2>

            <ul>
              {allowedUsersList.length ? (
                <>
                  {allowedUsersList.map(allowedUser => {
                    return (
                      <InputField key={allowedUser}>
                        <MasterUserButton
                          isMasterUser={allowedUser === masterUser}
                          type="button"
                          onClick={() => handleNewMasterUser(allowedUser)}
                        >
                          <RiVipCrown2Line />
                        </MasterUserButton>
                        <InputMask
                          mask="+99 (99) 99999-9999"
                          value={allowedUser}
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveAllowedUser(allowedUser)}
                        >
                          <FiTrash />
                        </button>
                      </InputField>
                    );
                  })}
                </>
              ) : (
                <ContentLoader>
                  <InputField>.</InputField>
                  <InputField>.</InputField>
                  <InputField>.</InputField>
                  <InputField>.</InputField>
                </ContentLoader>
              )}
            </ul>

            <InputField
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <InputMask
                mask="+99 (99) 99999-9999"
                onChange={e => setNewAllowedUser(e.currentTarget.value)}
                value={newAllowedUser}
              />
              <button type="button" onClick={() => handleAddNewAllowedUser()}>
                <FiSave />
              </button>
            </InputField>
          </AllowedUsersList>
        </Container>
      </Dashboard>
    </>
  );
};

export default Configurations;
