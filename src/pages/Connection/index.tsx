import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useSocket } from '../../hooks/socket';
import { Container } from './styles';

const Connection: React.FC = () => {
  const { socket, phone, isConnected } = useSocket();
  const [image, setImage] = useState<string>(null);
  const [internetIsConnected] = useState(navigator.onLine);

  useEffect(() => {
    socket.on('qrcode', (qrcode: string) => {
      setImage(qrcode);
    });
  }, [socket]);

  return (
    <Container>
      <>
        {phone || process.env.REACT_APP_AMBIENT === 'DEV' ? (
          <Redirect to="/dashboard" />
        ) : (
          <>
            {internetIsConnected ? (
              <>
                {isConnected ? (
                  <>
                    {image ? (
                      <>
                        <h2>
                          Por favor, escaneie o QRCode abaixo pelo seu whatsapp.
                        </h2>
                        {image && <img src={image} alt="qrcode" />}
                      </>
                    ) : (
                      <h1>Por favor aguarde...</h1>
                    )}
                  </>
                ) : (
                  <h2>Conectando-se ao servidor...</h2>
                )}
              </>
            ) : (
              <h2>Internet desconectada!</h2>
            )}
          </>
        )}
      </>
    </Container>
  );
};

export default Connection;
