import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import IChatIDDTO from '@shared/container/providers/WhatsappProvider/dtos/IChatIDDTO';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import WaError from '@shared/errors/WaError';
import IMessageTemplate from '@shared/utils/MessageTemplate/models/IMessageTemplate';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class SetHostGroupService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,

    @inject('MessageTemplate')
    private messageTemplate: IMessageTemplate,

    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public async execute(): Promise<IChatIDDTO> {
    const hostGroupId = this.whatsappProvider.message.from;
    if (!this.whatsappProvider.message.isGroupMsg) {
      throw new WaError(
        this.messageTemplate.warningMessage(
          'Esse comando só pode ser utilizado dentro de grupos.',
        ),
      );
    }

    const groupsAdmin = await this.whatsappProvider.groupsIamAdmin();
    const imGroupAdmin = groupsAdmin.find(group => group === hostGroupId);

    if (!imGroupAdmin) {
      throw new WaError(
        this.messageTemplate.errorMessage('É necessário me dar administrador.'),
      );
    }

    await this.jsonDBProvider.setHostGroupId(hostGroupId);

    await this.whatsappProvider.reply(
      hostGroupId,
      this.messageTemplate.successMessage(
        'Grupo definido como grupo anfitrião!',
      ),
      this.whatsappProvider.message.id,
    );

    return hostGroupId;
  }
}
