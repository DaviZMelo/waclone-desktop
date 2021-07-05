import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiCheck, FiHome, FiLink, FiSave, FiTarget } from 'react-icons/fi';
import { RiGroup2Fill } from 'react-icons/ri';
import * as Yup from 'yup';
import ContentLoader from 'styled-content-loader';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import Dashboard from '../../templates/Dashboard';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  Options,
  Option,
  OptionTitle,
  GroupSelect,
  GroupList,
  OptionContent,
  Item,
} from './styles';
import Title from '../../components/Title';

interface GroupInfo {
  id: string;
  title: string;
}

interface GroupConfigFormData {
  hostGroupId: string;
  targetGroupId: string;
  groupLink: string;
}

const GroupConfiguration: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const firstUpdate = useRef(true);

  const [targetGroupId, setTargetGroupId] = useState(String);
  const [hostGroupId, setHostGroupId] = useState(String);
  const [linkInputValue, setLinkInputValue] = useState(String);

  const [isHostGroupModalOpen, setIsHostGroupModalOpen] = useState(false);
  const [isTargetGroupModalOpen, setIsTargetGroupModalOpen] = useState(false);

  const [allGroupsInfo, setAllGroupsInfo] = useState<Array<GroupInfo>>([]);
  const [adminGroupsInfo, setAdminGroupsInfo] = useState<Array<GroupInfo>>([]);

  const { addToast } = useToast();

  useEffect(() => {
    api.get('/admin/groups/selected').then(response => {
      const selectedHostGroupId = response.data.hostGroupId;
      const selectedTargetGroupId = response.data.targetGroupId;

      if (firstUpdate.current) {
        setTargetGroupId(selectedTargetGroupId);
        setHostGroupId(selectedHostGroupId);
      }
    });
  }, []);

  const handleSubmit = useCallback(
    async (data: GroupConfigFormData) => {
      if (!data.hostGroupId || (!data.targetGroupId && !data.groupLink)) {
        addToast({
          type: 'error',
          title: 'Erro!',
          description: 'Selecione um grupo alvo e um grupo anfitrião.',
        });
        return;
      }
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          groupLink: Yup.string().test(
            'URL de grupo inválida',
            'URL de grupo inválida',
            val => {
              if (val.length && !val.includes('chat.whatsapp')) {
                return false;
              }
              return true;
            },
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/admin/groups/selected', data);

        addToast({
          title: 'Grupos salvos com sucesso',
          type: 'success',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        const { response }: AxiosError = err;

        if (response) {
          if (response.status === 406)
            addToast({
              title: 'URL de grupo inválida',
              type: 'error',
            });

          if (response.status === 401)
            addToast({
              title: 'Você foi removido desse grupo previamente.',
              type: 'error',
            });
        } else {
          addToast({
            title: 'Algo ocorreu errado, tente novamente.',
            type: 'error',
          });
        }
      }
    },
    [addToast],
  );

  const loadIamAdminGroups = useCallback(() => {
    api
      .get('/admin/groups?admin_groups=true')
      .then(response => setAdminGroupsInfo(response.data));
  }, []);

  const loadAllGroups = useCallback(() => {
    api.get(`/admin/groups?admin_groups=false`).then(response => {
      setAllGroupsInfo(response.data);
    });
  }, []);

  const handleHostGroupSelect = useCallback((groupId: string) => {
    setHostGroupId(groupId);
    setIsHostGroupModalOpen(false);
  }, []);

  const handleTargetGroupSelect = useCallback((groupId: string) => {
    setLinkInputValue('');
    setTargetGroupId(groupId);
    setIsTargetGroupModalOpen(false);
  }, []);

  return (
    <Dashboard>
      <Container>
        <Form id="GroupForm" ref={formRef} onSubmit={handleSubmit}>
          <Title icon={RiGroup2Fill}>Configurações de grupo</Title>
          <Options>
            <Option>
              <OptionTitle>
                <FiHome />
                <h2>Grupo anfitrião</h2>
              </OptionTitle>
              <OptionContent>
                <GroupSelect>
                  <Button
                    type="button"
                    onClick={() => setIsHostGroupModalOpen(true)}
                    icon={hostGroupId && FiCheck}
                  >
                    {hostGroupId ? (
                      <>Grupo anfitrião selecionado</>
                    ) : (
                      <>Selecionar grupo anfitrião</>
                    )}
                  </Button>

                  {isHostGroupModalOpen ? (
                    <Modal
                      isOpen={isHostGroupModalOpen}
                      onAfterOpen={loadIamAdminGroups}
                      onRequestClose={() => setIsHostGroupModalOpen(false)}
                    >
                      <GroupList>
                        <ul>
                          {adminGroupsInfo.length ? (
                            adminGroupsInfo.map(groupInfo => (
                              <Item
                                isSelected={groupInfo.id === hostGroupId}
                                key={groupInfo.id}
                                onClick={() =>
                                  handleHostGroupSelect(groupInfo.id)
                                }
                              >
                                <RiGroup2Fill size={140} />
                                <h2>{groupInfo.title}</h2>
                                {groupInfo.id === hostGroupId && (
                                  <h3>Selecionado</h3>
                                )}
                              </Item>
                            ))
                          ) : (
                            <ContentLoader
                              style={{ width: '100%', height: '35px' }}
                            >
                              {Array.from(Array(10), (_, index) => {
                                return <Item key={index} isSelected={false} />;
                              })}
                            </ContentLoader>
                          )}
                        </ul>
                      </GroupList>
                    </Modal>
                  ) : null}
                </GroupSelect>
              </OptionContent>
            </Option>

            <Option>
              <OptionTitle>
                <FiTarget />
                <h2>Grupo alvo</h2>
              </OptionTitle>
              <OptionContent>
                <GroupSelect>
                  <Button
                    type="button"
                    onClick={() => setIsTargetGroupModalOpen(true)}
                    icon={targetGroupId && FiCheck}
                  >
                    {targetGroupId ? (
                      <>Grupo alvo selecionado</>
                    ) : (
                      <>Selecionar grupo alvo</>
                    )}
                  </Button>
                  <Modal
                    isOpen={isTargetGroupModalOpen}
                    onAfterOpen={loadAllGroups}
                    onRequestClose={() => setIsTargetGroupModalOpen(false)}
                  >
                    <GroupList>
                      <ul>
                        {allGroupsInfo.length ? (
                          allGroupsInfo.map(groupInfo => (
                            <Item
                              isSelected={groupInfo.id === targetGroupId}
                              key={groupInfo.id}
                              onClick={() =>
                                handleTargetGroupSelect(groupInfo.id)
                              }
                            >
                              <RiGroup2Fill size={140} />
                              <h2>{groupInfo.title}</h2>
                              {groupInfo.id === targetGroupId && (
                                <h3>Selecionado</h3>
                              )}
                            </Item>
                          ))
                        ) : (
                          <ContentLoader
                            style={{ width: '100%', height: '35px' }}
                          >
                            {Array.from(Array(10), (_, index) => {
                              return <Item key={index} isSelected={false} />;
                            })}
                          </ContentLoader>
                        )}
                      </ul>
                    </GroupList>
                  </Modal>
                </GroupSelect>
                <h4>ou informe o link do grupo</h4>
                <Input
                  icon={FiLink}
                  name="groupLink"
                  value={linkInputValue && linkInputValue}
                  onKeyPress={() => setTargetGroupId(undefined)}
                  onChange={() => setLinkInputValue(undefined)}
                />
                <Input
                  type="hidden"
                  name="hostGroupId"
                  value={hostGroupId && hostGroupId}
                />
                <Input
                  type="hidden"
                  name="targetGroupId"
                  value={targetGroupId && targetGroupId}
                />
              </OptionContent>
            </Option>
          </Options>
          <Button type="submit" form="GroupForm" icon={FiSave}>
            Salvar
          </Button>
        </Form>
      </Container>
    </Dashboard>
  );
};

export default GroupConfiguration;
