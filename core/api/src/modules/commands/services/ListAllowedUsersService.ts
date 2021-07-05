import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import WaError from '@shared/errors/WaError';
import IMessageTemplate from '@shared/utils/MessageTemplate/models/IMessageTemplate';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class AddUserPermissionService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,

    @inject('MessageTemplate')
    private messageTemplate: IMessageTemplate,

    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public async execute(): Promise<Array<number>> {
    const allowedUsers = await this.jsonDBProvider.getAllowedUsers();

    if (!allowedUsers || allowedUsers.length < 1)
      throw new WaError(
        this.messageTemplate.errorMessage(
          'Nenhum telefone foi cadastrado até o momento.',
        ),
      );

    const parsedAllowedUsers = allowedUsers.toString().replace(/,/g, ',\n');
    await this.whatsappProvider.reply(
      this.whatsappProvider.message.from,
      `📑 *Telefones autorizados:*\n\n${parsedAllowedUsers}`,
      this.whatsappProvider.message.id,
    );

    return allowedUsers;
  }
}
