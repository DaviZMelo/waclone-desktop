import React from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface TitleProps {
  icon?: React.ComponentType<IconBaseProps>;
}

export const Title: React.FC<TitleProps> = ({ icon: Icon, children }) => {
  return (
    <Container>
      {Icon && <Icon />}
      <h1>{children}</h1>
    </Container>
  );
};

export default Title;
