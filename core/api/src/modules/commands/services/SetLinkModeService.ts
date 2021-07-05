import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import IMessageTemplate from '@shared/utils/MessageTemplate/models/IMessageTemplate';
import WaError from '@shared/errors/WaError';
import { inject, injectable } from 'tsyringe';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';

@injectable()
export default class SetLinkModeService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,

    @inject('MessageTemplate')
    private messageTemplate: IMessageTemplate,

    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public async execute(mode: string): Promise<boolean> {
    const linkMessage = await this.jsonDBProvider.getLinkMessage();
    const linkMode = mode === 'on';

    if (!linkMessage) {
      throw new WaError(
        this.messageTemplate.errorMessage(
          'É necessário definir a mensagem que acompanhará o envio do link, faça isso com o comando +mensagemlink',
        ),
      );
    }

    if (mode !== 'on' && mode !== 'off') {
      throw new WaError(
        this.messageTemplate.errorMessage('Os modos de link são on ou off.'),
      );
    }

    await this.jsonDBProvider.setLinkMode(linkMode);

    await this.whatsappProvider.reply(
      this.whatsappProvider.message.from,
      this.messageTemplate.successMessage(
        `O modo link foi definido para: ${mode}`,
      ),
      this.whatsappProvider.message.id,
    );

    return linkMode;
  }
}
