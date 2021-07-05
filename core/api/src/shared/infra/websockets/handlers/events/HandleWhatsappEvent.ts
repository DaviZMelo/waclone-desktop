import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import { Server } from 'socket.io';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class HandleWhatsappEvent {
  constructor(
    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public execute(io: Server) {
    this.whatsappProvider.captureEvents((type, data) => {
      if (type === 'qrcode') {
        io.emit('qrcode', data);
        io.emit('wa:signout');
      }
    });
  }
}
