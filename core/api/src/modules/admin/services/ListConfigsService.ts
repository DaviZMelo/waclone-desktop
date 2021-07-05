import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import { inject, injectable } from 'tsyringe';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import IConfigsDTO from '@shared/container/providers/JSONDBProvider/dtos/IConfigsDTO';

interface IConfigs extends IConfigsDTO {
  allFilled: boolean;
}

@injectable()
export default class ListConfigsService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,

    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public async execute(): Promise<IConfigs> {
    let allFilled = false;

    const { cloning, groups, links, users } =
      await this.jsonDBProvider.getConfigs();

    if (
      cloning.cloningDelay &&
      cloning.cloningContactsToAddPerDelay &&
      users.masterUser &&
      groups.hostGroupId &&
      groups.targetGroupId
    ) {
      allFilled = true;
    }

    if (
      (links.linkMode && !links.linkMessage) ||
      (links.linkMode && !groups.targetGroupId) ||
      (links.linkMode && !groups.targetGroupLink)
    ) {
      allFilled = false;
    }

    const configs = {
      cloning,
      groups,
      links,
      users,
      allFilled,
    };

    return configs;
  }
}
