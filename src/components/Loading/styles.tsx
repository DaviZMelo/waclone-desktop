import styled from 'styled-components';
import LoadingSpinner from '../../assets/loading-spinner.gif';

export const Container = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8) url(${LoadingSpinner}) 50% 50% no-repeat;
`;
