import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import WaError from '@shared/errors/WaError';
import IMessageTemplate from '@shared/utils/MessageTemplate/models/IMessageTemplate';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class RemoveAllowedUserService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,

    @inject('MessageTemplate')
    private messageTemplate: IMessageTemplate,

    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public async execute(contact: number): Promise<void> {
    const foundAllowedUser = await this.jsonDBProvider.findAllowedUser(contact);

    if (!foundAllowedUser)
      throw new WaError(
        this.messageTemplate.errorMessage(
          'Esse telefone não foi encontrado no banco de dados.',
        ),
      );

    await this.jsonDBProvider.removeAllowedUser(contact);

    await this.whatsappProvider.sendText(
      this.whatsappProvider.message.from,
      this.messageTemplate.successMessage(
        `O número ${contact} foi desautorizado a usar o bot`,
      ),
    );
  }
}
