import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { Container, Content, ModalBox } from './styles';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: Function;
  onAfterOpen?: Function;
  width?: number;
  height?: number;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen = false,
  onRequestClose,
  onAfterOpen,
  width = 90,
  height = 90,
}) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      {isModalOpen && (
        <>
          {onAfterOpen && onAfterOpen()}
          <Container
            onClick={e => {
              if (e.target === e.currentTarget) {
                onRequestClose();
              }
            }}
          >
            <ModalBox width={width} height={height}>
              <FiX size={30} onClick={() => onRequestClose()} />
              <Content>{children}</Content>
            </ModalBox>
          </Container>
        </>
      )}
    </>
  );
};

export default Modal;
