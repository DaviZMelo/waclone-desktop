import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import WaError from '@shared/errors/WaError';
import IMessageTemplate from '@shared/utils/MessageTemplate/models/IMessageTemplate';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class AddAllowedUser {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,

    @inject('MessageTemplate')
    private messageTemplate: IMessageTemplate,

    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public async execute(contact: number): Promise<void> {
    if (contact.toString().length < 10 || !Number(contact))
      throw new WaError(this.messageTemplate.errorMessage('Telefone inválido'));

    const foundAllowedUser = await this.jsonDBProvider.findAllowedUser(contact);

    if (foundAllowedUser)
      throw new WaError(
        this.messageTemplate.warningMessage(
          'Esse telefone já está autorizado a utilizar o bot.',
        ),
      );

    await this.jsonDBProvider.addAllowedUser(contact);

    await this.whatsappProvider.sendText(
      this.whatsappProvider.message.from,
      this.messageTemplate.successMessage(
        `O número ${contact} foi autorizado a usar o bot`,
      ),
    );
  }
}
