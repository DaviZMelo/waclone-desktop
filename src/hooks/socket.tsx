import React, { useCallback, useContext, useState } from 'react';
import { createContext, useEffect } from 'react';
import socketIOClient from 'socket.io-client/dist/socket.io';

interface SocketContextData {
  socket: SocketIOClient.Socket;
  phone: string;
  isConnected: boolean;
  signOut(): void;
  restart(): void;
}

const SocketContext = createContext<SocketContextData>({} as SocketContextData);

const SocketProvider: React.FC = ({ children }) => {
  const socket = socketIOClient('http://localhost:45541');

  const [isConnected, setIsConnected] = useState(false);
  const [waPhone, setWaPhone] = useState<string>(() => {
    if (!isConnected) return null;
    return localStorage.getItem('@Wa:Phone');
  });

  useEffect(() => {
    if (isConnected) setWaPhone(localStorage.getItem('@Wa:Phone'));
  }, [isConnected]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
      setWaPhone(null);
      localStorage.removeItem('@Wa:Phone');
    });

    socket.on('wa:signin', (phone: string) => {
      setWaPhone(phone);
      localStorage.setItem('@Wa:Phone', phone);
    });

    socket.on('wa:signout', () => {
      setWaPhone(null);
      localStorage.removeItem('@Wa:Phone');
    });
  }, [setIsConnected, socket]);

  const signOut = useCallback(() => {
    setWaPhone(null);
    localStorage.removeItem('@Wa:Phone');
    socket.emit('front:logout');
  }, [socket]);

  const restart = useCallback(() => {
    setWaPhone(null);
    localStorage.removeItem('@Wa:Phone');
    socket.emit('front:restart');
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{ phone: waPhone, isConnected, socket, signOut, restart }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = (): SocketContextData => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocket must be used within an SocketProvider');
  }

  return context;
};

export { SocketProvider, useSocket };
