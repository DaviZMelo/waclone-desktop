import React from 'react';

import { SocketProvider } from './socket';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <SocketProvider>
    <ToastProvider>{children}</ToastProvider>
  </SocketProvider>
);

export default AppProvider;
