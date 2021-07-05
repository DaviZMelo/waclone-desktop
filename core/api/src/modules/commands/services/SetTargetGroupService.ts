import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IVCardPropsDTO from '@shared/container/providers/VCardProvider/dtos/VCardPropsDTO';
import IVCardProvider from '@shared/container/providers/VCardProvider/models/IVCardProvider';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import IGroupIDDTO from '@shared/container/providers/WhatsappProvider/dtos/IGroupIDDTO';

import WaError from '@shared/errors/WaError';
import IMessageTemplate from '@shared/utils/MessageTemplate/models/IMessageTemplate';
import tempFileConfig from '@config/tempFile';

import path from 'path';
import { inject, injectable } from 'tsyringe';
import IChatDTO from '@shared/container/providers/WhatsappProvider/dtos/IChatDTO';

@injectable()
export default class SetTargetGroupService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('VCardProvider')
    private vcardProvider: IVCardProvider,

    @inject('MessageTemplate')
    private messageTemplate: IMessageTemplate,

    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public async execute(
    groupLink: string,
  ): Promise<
    string | number | boolean | `${number}-${number}@g.us` | IChatDTO
  > {
    const vcardContactProps: Array<IVCardPropsDTO> = [];

    if (!groupLink.includes('chat.whatsapp')) {
      throw new WaError(
        this.messageTemplate.errorMessage('O link informado é inválido'),
      );
    }
    const joinedGroup = await this.whatsappProvider.joinGroupViaLink(groupLink);

    if (!joinedGroup || Number(joinedGroup)) {
      throw new WaError(
        this.messageTemplate.errorMessage(
          'Não foi possível entrar neste grupo, verifique se está cheio ou se eu já fui banido desse grupo anteriormente.',
        ),
      );
    }

    const joinedGroupID = joinedGroup as IGroupIDDTO;

    await this.jsonDBProvider.setTargetGroupId(joinedGroupID);
    const groupMembersId = await this.whatsappProvider.getGroupMembersId(
      joinedGroupID,
    );

    await Promise.all([
      groupMembersId.map(group => {
        return vcardContactProps.push({
          firstname: group.replace(/@c.us/, ''),
          nickname: group.replace(/@c.us/, ''),
          tel: group.replace(/@c.us/, ''),
        });
      }),
    ]);

    await this.jsonDBProvider.setContacts(groupMembersId);
    const vcard = this.vcardProvider.create(vcardContactProps);

    await this.storageProvider.saveFile('Contatos do grupo.vcf', vcard);

    const filePath = path.resolve(
      tempFileConfig.tempFileFolder,
      'contatos.vcf',
    );

    await this.whatsappProvider.sendFile(
      this.whatsappProvider.message.from,
      filePath,
      'Contatos do grupo',
      'Contatos para funcionamento do bot',
      this.whatsappProvider.message.id,
    );

    await this.storageProvider.deleteFile('Contatos do grupo.vcf');

    return joinedGroup;
  }
}
