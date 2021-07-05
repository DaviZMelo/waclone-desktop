import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import { Server } from 'socket.io';
import { container, inject, injectable } from 'tsyringe';
import HandleWhatsappMessage from './HandleWhatsappMessage';
import HandleWhatsappEvent from './HandleWhatsappEvent';
import WhatsappSocketListener from '../listeners/WhatsappSocketListener';

@injectable()
export default class StartWhatsapp {
  constructor(
    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public async execute(io: Server) {
    container.resolve(HandleWhatsappEvent).execute(io);

    await this.whatsappProvider.createInstance();

    const myPhoneNumber = await this.whatsappProvider.getHostNumber();
    container.resolve(WhatsappSocketListener).execute(io);

    container.registerInstance<IWhatsappProvider>(
      'WhatsappProvider',
      this.whatsappProvider,
    );

    await container.resolve(HandleWhatsappMessage).execute();
    io.emit('wa:signin', myPhoneNumber);

    return true;
  }
}
