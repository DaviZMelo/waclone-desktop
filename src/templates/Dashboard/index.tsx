import React from 'react';
import { RiHome2Line } from 'react-icons/ri';
import {
  FiSettings,
  FiLogOut,
  FiHelpCircle,
  FiRefreshCcw,
} from 'react-icons/fi';

import { useHistory } from 'react-router-dom';
import { Content, Footer, FooterOption } from './styles';
import { useSocket } from '../../hooks/socket';

const Dashboard: React.FC = ({ children }) => {
  const history = useHistory();

  const { signOut, restart } = useSocket();
  return (
    <>
      <Content>{children}</Content>
      <Footer>
        <FooterOption onClick={() => history.push('/dashboard')}>
          <RiHome2Line />
        </FooterOption>
        <FooterOption onClick={() => history.push('/dashboard/config')}>
          <FiSettings />
        </FooterOption>
        <FooterOption onClick={() => history.push('/dashboard/help')}>
          <FiHelpCircle />
        </FooterOption>
        <FooterOption onClick={() => restart()}>
          <FiRefreshCcw />
        </FooterOption>
        <FooterOption onClick={() => signOut()}>
          <FiLogOut />
        </FooterOption>
      </Footer>
    </>
  );
};

export default Dashboard;
