import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IVCardProvider from '@shared/container/providers/VCardProvider/models/IVCardProvider';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import path from 'path';

import tempFileConfig from '@config/tempFile';
import IChatIDDTO from '@shared/container/providers/WhatsappProvider/dtos/IChatIDDTO';

@injectable()
export default class ListContactsService {
  constructor(
    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,

    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,

    @inject('VCardProvider')
    private vcardProvider: IVCardProvider,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(type: string): Promise<boolean | string> {
    const targetGroup = await this.jsonDBProvider.getTargetGroupId();
    const hostNumber = await this.whatsappProvider.getHostNumber();
    const masterUser = await this.jsonDBProvider.getMasterUser();

    const stringifiedMasterUser = masterUser.toString();

    const groupMembersId = await this.whatsappProvider.getGroupMembersId(
      targetGroup,
    );

    await this.jsonDBProvider.setContacts(groupMembersId);

    const vcardContactProps = await Promise.all(
      groupMembersId.map(group => {
        return {
          firstname: group.replace(/@c.us/, ''),
          nickname: group.replace(/@c.us/, ''),
          tel: group.replace(/@c.us/, ''),
        };
      }),
    );

    const vCard = this.vcardProvider.create(vcardContactProps);

    if (type === 'download') {
      return vCard;
    }

    if (type === 'sendByMessage') {
      await this.storageProvider.saveFile('contatos.vcf', vCard);

      const filePath = path.resolve(
        tempFileConfig.tempFileFolder,
        'contatos.vcf',
      );
      await this.whatsappProvider.sendFile(
        `${hostNumber}@c.us` as IChatIDDTO,
        filePath,
        'Contatos do grupo',
        'Contatos para funcionamento do bot',
      );

      const sendedToMasterUser = await this.whatsappProvider.sendFile(
        `${stringifiedMasterUser}@c.us` as IChatIDDTO,
        filePath,
        'Contatos do grupo',
        'Contatos para funcionamento do bot',
      );

      if (!sendedToMasterUser) {
        const newMasterUser =
          stringifiedMasterUser.length === 13
            ? stringifiedMasterUser.slice(0, 4) + stringifiedMasterUser.slice(5)
            : `${stringifiedMasterUser.slice(
                0,
                4,
              )}9${stringifiedMasterUser.slice(4)}`;

        await this.whatsappProvider.sendFile(
          `${newMasterUser}@c.us` as IChatIDDTO,
          filePath,
          'Contatos do grupo',
          'Contatos para funcionamento do bot',
        );
      }

      return true;
    }

    throw new AppError('No valid type informed');
  }
}
