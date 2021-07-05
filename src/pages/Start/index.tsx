import React, { useCallback, useEffect, useState } from 'react';
import {
  FiArrowLeft,
  FiArrowRight,
  FiClock,
  FiCopy,
  FiDownload,
  FiEdit,
  FiEye,
  FiHome,
  FiLink,
  FiMessageCircle,
  FiPlay,
  FiSend,
  FiSettings,
  FiUser,
} from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import Title from '../../components/Title';
import api from '../../services/api';
import Modal from '../../components/Modal';

import Dashboard from '../../templates/Dashboard';
import {
  Container,
  StartContainer,
  StartModalContent,
  ModalFooter,
  SendContactModalContent,
} from './styles';
import { useToast } from '../../hooks/toast';
import IConfigs from '../../types/IConfigs';

const { ipcRenderer } = window.require('electron');
const Home: React.FC = () => {
  const { addToast } = useToast();
  const [isAllowedToStart, setIsAllowedToStart] = useState(false);
  const [isStartModalOpen, setStartModalOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isLinkMessageModalOpen, setLinkMessageModalOpen] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [isCloneButtonEnabled, setCloneButtonEnabled] = useState(false);
  const [configs, setConfigs] = useState<IConfigs>({
    users: {},
    groups: {},
    links: {},
    cloning: {},
    logsConfigs: {},
    logs: {},
  } as IConfigs);
  const [opennedItems, setOpennedItems] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    api.get('/admin/configs').then(response => {
      const { allFilled } = response.data;

      setConfigs(response.data);
      setIsAllowedToStart(allFilled);
    });
  }, []);

  const handleStart = useCallback(() => {
    setStartModalOpen(true);

    api.get('/admin/configs').then(response => {
      setConfigs(response.data);
    });
  }, []);

  const handleSendContacts = useCallback(() => {
    setStartModalOpen(false);
    setContactModalOpen(true);
  }, []);

  const handleOpenItem = useCallback(
    (item: number) => {
      const replicatedOpennedItems = opennedItems;

      replicatedOpennedItems[item] = !opennedItems[item];

      setOpennedItems([...replicatedOpennedItems]);
    },
    [opennedItems],
  );

  const handleDownloadContacts = useCallback(() => {
    setLoadingDownload(true);

    api
      .get('/admin/contacts?type=download')
      .then(response => {
        ipcRenderer.invoke('download', response.data).then(downloadResponse => {
          setLoadingDownload(false);

          if (downloadResponse) {
            setCloneButtonEnabled(true);
          }
        });
      })
      .catch(() => {
        setLoadingDownload(false);
      });
  }, []);

  const handleSendContactsByMessage = useCallback(() => {
    setLoadingSend(true);

    api
      .get('/admin/contacts?type=sendByMessage')
      .then(response => {
        if (response.data) {
          setCloneButtonEnabled(true);
          setLoadingSend(false);

          addToast({
            type: 'success',
            title: 'Contatos enviados',
          });
        }
      })
      .catch(() => {
        setLoadingSend(false);
      });
  }, [addToast]);

  const handleStartClone = useCallback(() => {
    api.post('/admin/cloning').then(() => {
      addToast({
        type: 'success',
        title: 'Clonagem iniciada',
        description:
          'Aguarde alguns minutos para que a clonagem seja finalizada, verifique os registro para verificar números que não foram possíveis adicionar.',
      });
      setCloneButtonEnabled(false);
      setContactModalOpen(false);
    });
  }, [addToast]);

  const { push } = useHistory();

  return (
    <>
      <Dashboard>
        <Container>
          <Title icon={FiHome}>Página inicial</Title>

          <StartContainer isAllowedToStart={isAllowedToStart}>
            <Button
              disabled={!isAllowedToStart}
              type="button"
              icon={FiPlay}
              onClick={handleStart}
            >
              Iniciar
            </Button>
            {!isAllowedToStart && <h4>Por favor, efetue as configurações.</h4>}
          </StartContainer>
          <Modal
            isOpen={isStartModalOpen}
            onRequestClose={() => setStartModalOpen(false)}
          >
            <StartModalContent>
              <Title icon={FiSettings}>Confirme as configurações</Title>
              <ul>
                <li onClick={() => handleOpenItem(0)}>
                  <FiClock />
                  <h4>Delay</h4>

                  {opennedItems[0] ? (
                    <>
                      <FiArrowRight />
                      <p>{configs.cloning.cloningDelay} segundos</p>
                    </>
                  ) : (
                    <FiArrowLeft />
                  )}
                </li>
                {configs.links.linkMode && (
                  <>
                    <li onClick={() => handleOpenItem(3)}>
                      <FiLink />
                      <h4>Link do grupo anfitrião</h4>

                      {opennedItems[3] ? (
                        <>
                          <FiArrowRight />
                          <p>{configs.groups.targetGroupLink}</p>
                        </>
                      ) : (
                        <FiArrowLeft />
                      )}
                    </li>
                    <li>
                      <FiMessageCircle />
                      <h4 onClick={() => handleOpenItem(4)}>
                        Mensagem a ser enviada
                      </h4>
                      {opennedItems[4] ? (
                        <>
                          <FiArrowRight />
                          <Button
                            type="button"
                            name="seeMessage"
                            icon={FiEye}
                            onClick={() => setLinkMessageModalOpen(true)}
                          >
                            Ver mensagem
                          </Button>
                          <Modal
                            isOpen={isLinkMessageModalOpen}
                            onRequestClose={() =>
                              setLinkMessageModalOpen(false)
                            }
                            height={40}
                            width={40}
                          >
                            <p>{configs.links.linkMessage}</p>
                          </Modal>
                        </>
                      ) : (
                        <FiArrowLeft />
                      )}
                    </li>
                  </>
                )}

                <li onClick={() => handleOpenItem(5)}>
                  <FiUser />
                  <h4>Quantidade de contatos a adicionar a cada 20 segundos</h4>
                  {opennedItems[5] ? (
                    <>
                      <FiArrowRight />
                      <p>{configs.cloning.cloningContactsToAddPerDelay}</p>
                    </>
                  ) : (
                    <FiArrowLeft />
                  )}
                </li>
              </ul>
            </StartModalContent>
            <ModalFooter>
              <Button
                type="button"
                icon={FiEdit}
                onClick={() => push('/dashboard/config')}
              >
                Editar
              </Button>
              <Button type="button" icon={FiUser} onClick={handleSendContacts}>
                Enviar contatos
              </Button>
            </ModalFooter>
          </Modal>
          <Modal
            isOpen={isContactModalOpen}
            onRequestClose={() => setContactModalOpen(false)}
          >
            <SendContactModalContent>
              <Title icon={FiUser}>Contatos</Title>
              <Button
                type="button"
                icon={FiDownload}
                isLoading={loadingDownload}
                onClick={handleDownloadContacts}
              >
                Baixar
              </Button>
              <Button
                type="button"
                icon={FiSend}
                isLoading={loadingSend}
                onClick={handleSendContactsByMessage}
              >
                Enviar por mensagem
              </Button>
            </SendContactModalContent>
            <ModalFooter>
              <Button
                type="button"
                icon={FiArrowLeft}
                onClick={() => {
                  setContactModalOpen(false);
                  setStartModalOpen(true);
                }}
              >
                Voltar
              </Button>
              <Button
                type="button"
                icon={FiCopy}
                onClick={handleStartClone}
                disabled={!isCloneButtonEnabled}
              >
                Clonar
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </Dashboard>
    </>
  );
};

export default Home;
