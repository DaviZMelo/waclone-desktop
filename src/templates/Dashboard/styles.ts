import styled from 'styled-components';

export const Content = styled.div`
  margin: 0 auto;
  margin-top: 60px;
  min-width: 100%;
  min-height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 28px;
  width: 100%;
  box-shadow: 1px 1px;
  color: black;
  box-shadow: inset 0 0 1px #000000;
  text-align: center;
`;

export const FooterOption = styled.div`
  &:hover {
    cursor: pointer;
  }
  svg {
    width: 25px;
    height: 25px;
  }

  & + & {
    border-left: 1px solid #c3c3c3;
  }
`;
