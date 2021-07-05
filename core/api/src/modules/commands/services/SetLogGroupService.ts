import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import WaError from '@shared/errors/WaError';
import IMessageTemplate from '@shared/utils/MessageTemplate/models/IMessageTemplate';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class SetLogGroupService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,

    @inject('MessageTemplate')
    private messageTemplate: IMessageTemplate,

    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public async execute(): Promise<void> {
    if (!this.whatsappProvider.message.isGroupMsg) {
      throw new WaError(
        this.messageTemplate.warningMessage(
          'Esse comando só pode ser utilizado dentro de grupos.',
        ),
      );
    }

    await this.jsonDBProvider.setLogGroup(this.whatsappProvider.message.from);

    this.whatsappProvider.reply(
      this.whatsappProvider.message.from,
      this.messageTemplate.successMessage('O grupo de logs foi definido.'),
      this.whatsappProvider.message.id,
    );
  }
}
