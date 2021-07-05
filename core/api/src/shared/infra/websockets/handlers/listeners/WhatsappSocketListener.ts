import { container, inject, injectable } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import { Socket, Server } from 'socket.io';

import StartWhatsapp from '../events/StartWhatsapp';


@injectable()
export default class WhatsappSocketListener {
  constructor(
    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public execute(io: Server) {
    io.on('connection', (socket: Socket) => {
      socket.on('front:logout', async () => {
        await this.whatsappProvider.logout();
          let sessionPath;

          const sessionDevPath = path.resolve(__dirname, '..','..','..','..','..','..','session.data.json');

        if(fs.existsSync(sessionDevPath)) {
          sessionPath = sessionDevPath;
        } else {
          sessionPath = path.resolve(__dirname, '..','..','..','..','..','..', 'session.data.json');
        }

        await fs.promises.unlink(sessionPath);
        await container.resolve(StartWhatsapp).execute(io);
      });

      socket.on('front:restart', async () => {
        await this.whatsappProvider.logout();
        await container.resolve(StartWhatsapp).execute(io);
      });
    });
  }
}
