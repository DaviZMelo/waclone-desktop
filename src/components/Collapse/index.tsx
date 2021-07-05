import React, { useState } from 'react';
import { Collapse as CollapseComponent } from 'react-collapse';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';

import { Container, Header, Content } from './styles';

interface CollapseProps {
  title: string;
}

const Collapse: React.FC<CollapseProps> = ({ title, children }) => {
  const [isOpened, setOpened] = useState(false);

  return (
    <Container>
      <Header>
        <button type="button" onClick={() => setOpened(!isOpened)}>
          <h2>{title}</h2>
          {isOpened ? <FiArrowDown /> : <FiArrowUp />}
        </button>
      </Header>

      <CollapseComponent isOpened={isOpened}>
        <Content>{isOpened && children}</Content>
      </CollapseComponent>
    </Container>
  );
};

export default Collapse;
