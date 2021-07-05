import 'reflect-metadata';
import 'dotenv/config';
import { Server } from 'socket.io';
import { container } from 'tsyringe';
import WhatsappSocketEvent from './handlers/events/StartWhatsapp';

export default function startSocket(server: any) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  container.resolve(WhatsappSocketEvent).execute(io);

  process.on('exit', () => {
    io.send('wa:signout');
    io.send('disconnect');
  });
}
