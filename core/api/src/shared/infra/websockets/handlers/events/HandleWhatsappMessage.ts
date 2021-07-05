import HandleCommandsController from '@modules/commands/infra/controllers/HandleCommandsController';
import ensureUserAuthorized from '@shared/utils/ensureUserAuthorized';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import { container, inject, injectable } from 'tsyringe';
import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import WaError from '@shared/errors/WaError';
import { Message } from '@open-wa/wa-automate';

@injectable()
export default class HandleWhatsappMessage {
  constructor(
    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,

    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,
  ) {}

  public async execute() {
    const handleCommands = new HandleCommandsController().create;
    const handleMessage = async (message: Message) => {
      this.whatsappProvider.message = message;
      container.registerInstance<IWhatsappProvider>(
        'whatsappProvider',
        this.whatsappProvider,
      );

      if (message.body?.startsWith('+')) {
        const parsedMessage = message.body.replace('+', '').split(' ');
        const command = parsedMessage[0];
        const params = parsedMessage.slice(1, parsedMessage.length);

        const isAuthorized = ensureUserAuthorized(
          this.whatsappProvider.message.sender.id.replace('@c.us', ''),
          await this.jsonDBProvider.getAllowedUsers(),
          await this.jsonDBProvider.getMasterUser(),
        );

        if (isAuthorized) {
          await handleCommands(command, params).catch(err => {
            if (err instanceof WaError) {
              return this.whatsappProvider.reply(
                this.whatsappProvider.message.from,
                err.message,
                this.whatsappProvider.message.id,
              );
            }
            return err;
          });
        }
      }
    };

    if (process.env.AMBIENT === 'DEV') {
      this.whatsappProvider.onAnyMessage(async message =>
        handleMessage(message),
      );
    } else {
      this.whatsappProvider.onMessage(async message => handleMessage(message));
    }
  }
}
