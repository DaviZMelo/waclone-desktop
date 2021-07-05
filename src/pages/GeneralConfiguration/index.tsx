import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiGlobe, FiSave } from 'react-icons/fi';
import Button from '../../components/Button';
import InputNumber from '../../components/InputNumber';
import Title from '../../components/Title';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import Dashboard from '../../templates/Dashboard';
import IConfigs from '../../types/IConfigs';
import { Container, Options, Option } from './styles';

const GeneralConfiguration: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [delay, setDelay] = useState(1);
  const [contactsToAddPerSecond, setContactsToAddPerSecond] = useState(1);
  const { addToast } = useToast();

  useEffect(() => {
    api.get<IConfigs>('/admin/configs').then(response => {
      setDelay(response.data.cloning.cloningDelay);
      setContactsToAddPerSecond(
        response.data.cloning.cloningContactsToAddPerDelay,
      );
    });
  }, [contactsToAddPerSecond, delay]);

  const handleSubmit = useCallback(
    data => {
      api
        .post('/admin/configs', {
          cloning: {
            cloningDelay: data.delay,
            cloningContactsToAddPerDelay: data.contactsToAddPerSecond,
          },
        })
        .then(() => {
          addToast({
            title: 'Configurações salvas com sucesso',
          });
        })
        .catch(err => {
          if (err.response?.status) {
            addToast({
              title: 'Valores inválidos',
            });
          }
        });
    },
    [addToast],
  );
  return (
    <Dashboard>
      <Container>
        <Title icon={FiGlobe}>Configurações gerais</Title>

        <Form id="GeneralConfigs" ref={formRef} onSubmit={handleSubmit}>
          <Options>
            <Option>
              <h2>Intervalo</h2>
              <InputNumber
                name="delay"
                min={1}
                max={180}
                defaultValue={delay}
              />
            </Option>
            <Option>
              <h2>Contatos a adicionar por intervalo de tempo</h2>
              <InputNumber
                name="contactsToAddPerSecond"
                min={1}
                max={30}
                defaultValue={contactsToAddPerSecond}
              />
            </Option>
          </Options>
          <Button type="submit" icon={FiSave}>
            Salvar
          </Button>
        </Form>
      </Container>
    </Dashboard>
  );
};

export default GeneralConfiguration;
