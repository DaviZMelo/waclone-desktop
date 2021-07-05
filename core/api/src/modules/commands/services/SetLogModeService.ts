import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import IMessageTemplate from '@shared/utils/MessageTemplate/models/IMessageTemplate';
import WaError from '@shared/errors/WaError';
import { inject, injectable } from 'tsyringe';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';

@injectable()
export default class SetLogModeService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,

    @inject('MessageTemplate')
    private messageTemplate: IMessageTemplate,

    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public async execute(mode: string): Promise<void> {
    const logGroup = await this.jsonDBProvider.getLogGroup();
    if (mode !== 'on' && mode !== 'off') {
      throw new WaError(
        this.messageTemplate.errorMessage('Os modos de log são on ou off.'),
      );
    }

    if (!logGroup) {
      throw new WaError(
        this.messageTemplate.errorMessage(
          'É preciso definir um grupo de log pelo comando +grupolog',
        ),
      );
    }

    await this.jsonDBProvider.setLogMode(mode === 'on');

    await this.whatsappProvider.reply(
      this.whatsappProvider.message.from,
      this.messageTemplate.successMessage(
        `O modo log foi definido para: ${mode}`,
      ),
      this.whatsappProvider.message.id,
    );
  }
}
