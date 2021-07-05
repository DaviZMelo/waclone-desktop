import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import IMessageTemplate from '@shared/utils/MessageTemplate/models/IMessageTemplate';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class SetLinkMessageService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,

    @inject('MessageTemplate')
    private messageTemplate: IMessageTemplate,

    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public async execute(message: string): Promise<void> {
    await this.jsonDBProvider.setLinkMessage(message);

    this.whatsappProvider.reply(
      this.whatsappProvider.message.from,
      this.messageTemplate.successMessage(
        'A mensagem que acompanhará o link foi definida.',
      ),
      this.whatsappProvider.message.id,
    );
  }
}
