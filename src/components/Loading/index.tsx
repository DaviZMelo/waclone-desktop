import React from 'react';
import { Container } from './styles';

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  return <>{isLoading && <Container />}</>;
};

export default Loading;
