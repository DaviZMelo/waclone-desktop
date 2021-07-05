import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiLink, FiMessageCircle, FiSave } from 'react-icons/fi';
import Switch from 'react-switch';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import Title from '../../components/Title';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import Dashboard from '../../templates/Dashboard';
import {
  Container,
  TypeLinkMessage,
  CharactersCount,
  LinkSwitch,
} from './styles';

interface FormData {
  linkMessage: string;
}

const LinksConfiguration: React.FC = () => {
  const { addToast } = useToast();
  const maxCharacterLength = 63536;
  const formRef = useRef<FormHandles>(null);
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [defaultFormFalue, setDefaultFormValue] = useState<string>();
  const [isLinkMode, setLinkMode] = useState(false);

  useEffect(() => {
    api.get('/admin/links/message').then(response => {
      const responseLinkMessage = response.data;

      setDefaultFormValue(responseLinkMessage);
    });

    api.get('/admin/links/mode').then(response => {
      const isResponseLinkMode = response.data;

      setLinkMode(isResponseLinkMode);
    });
  }, [defaultFormFalue]);

  const handleFormSubmit = useCallback(
    async (data: FormData) => {
      await api.post('/admin/links/message', data).catch(() => {
        return addToast({
          type: 'error',
          title: 'Falha ao salvar mensagem, tente novamente.',
        });
      });
      addToast({
        type: 'success',
        title: 'Mensagem salva com sucesso!',
      });
    },
    [addToast],
  );

  const handleTextAreaTyping = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textAreaValue = event.currentTarget.value;
      if (textAreaValue.length >= maxCharacterLength) {
        const newTextAreaValue = textAreaValue.substr(0, maxCharacterLength);
        event.currentTarget.value = newTextAreaValue;
        setCharactersTyped(maxCharacterLength);
        return event.preventDefault();
      }
      return setCharactersTyped(textAreaValue.length);
    },
    [],
  );

  const handleLinkModeChange = useCallback(() => {
    setLinkMode(!isLinkMode);

    api
      .post('/admin/links/mode', {
        linkMode: !isLinkMode,
      })
      .catch(() => {
        setLinkMode(false);
      });
  }, [setLinkMode, isLinkMode]);

  return (
    <Dashboard>
      <Container>
        <Form onSubmit={handleFormSubmit} ref={formRef}>
          <Title icon={FiLink}>Configurações de link</Title>
          <LinkSwitch>
            <h2>Modo link</h2>
            <Switch
              checked={isLinkMode}
              onChange={handleLinkModeChange}
              checkedIcon={false}
              uncheckedIcon={false}
            />
          </LinkSwitch>

          {isLinkMode && (
            <>
              <TypeLinkMessage>
                <h2>
                  Defina a mensagem que será enviada junto com o link do grupo
                </h2>
                <TextArea
                  onChange={handleTextAreaTyping}
                  icon={FiMessageCircle}
                  defaultValue={defaultFormFalue}
                  name="linkMessage"
                />
              </TypeLinkMessage>

              <CharactersCount
                isInLimit={charactersTyped >= maxCharacterLength}
              >
                {charactersTyped} / {maxCharacterLength}
              </CharactersCount>
              <Button type="submit" icon={FiSave}>
                Salvar mensagem
              </Button>
            </>
          )}
        </Form>
      </Container>
    </Dashboard>
  );
};

export default LinksConfiguration;
