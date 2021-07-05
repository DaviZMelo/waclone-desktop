import React from 'react';
import {
  FiFileText,
  FiGlobe,
  FiLink,
  FiSettings,
  FiUser,
} from 'react-icons/fi';
import { RiGroup2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { Title } from '../../components/Title';

import Dashboard from '../../templates/Dashboard';
import { ConfigList, Container } from './styles';

const Configurations: React.FC = () => {
  return (
    <Dashboard>
      <Container>
        <Title icon={FiSettings}>Configurações</Title>

        <ConfigList>
          <Link to="/dashboard/config/all">
            <Button type="button">
              <FiGlobe />
              Geral
            </Button>
          </Link>
          <Link to="/dashboard/config/users">
            <Button type="button">
              <FiUser />
              Usuários
            </Button>
          </Link>
          <Link to="/dashboard/config/groups">
            <Button type="button">
              <RiGroup2Fill />
              Grupos
            </Button>
          </Link>
          <Link to="/dashboard/config/links">
            <Button type="button">
              <FiLink />
              Links
            </Button>
          </Link>
          <Link to="/dashboard/config/logs">
            <Button type="button">
              <FiFileText />
              Logs
            </Button>
          </Link>
        </ConfigList>
      </Container>
    </Dashboard>
  );
};

export default Configurations;
