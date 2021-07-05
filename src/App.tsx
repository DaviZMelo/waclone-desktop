import React from 'react';
import 'dotenv/config';
import { HashRouter as Router } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';

import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyle />
    </Router>
  );
};

export default App;
