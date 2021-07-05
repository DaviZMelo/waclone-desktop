import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import IMessageTemplate from '@shared/utils/MessageTemplate/models/IMessageTemplate';
import WaError from '@shared/errors/WaError';
import { inject, injectable } from 'tsyringe';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';

@injectable()
export default class SetDelayService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,

    @inject('MessageTemplate')
    private messageTemplate: IMessageTemplate,

    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public async execute(delay: number): Promise<void> {
    const numberedDelay = Number(delay);

    if (!numberedDelay) {
      throw new WaError(
        this.messageTemplate.errorMessage('O delay precisa ser um número'),
      );
    }
    if (numberedDelay < 10) {
      throw new WaError(
        this.messageTemplate.errorMessage('O valor mínimo do delay é 10'),
      );
    }

    if (numberedDelay > 500) {
      throw new WaError(
        this.messageTemplate.errorMessage('O valor mínimo do delay é 10'),
      );
    }
    this.jsonDBProvider.setDelay(numberedDelay);

    await this.whatsappProvider.reply(
      this.whatsappProvider.message.from,
      this.messageTemplate.successMessage(
        `O delay foi definido para ${delay} segundos.`,
      ),
      this.whatsappProvider.message.id,
    );
  }
}
