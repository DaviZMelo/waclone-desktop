import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListGroupsIamAdminService {
  constructor(
    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public async execute(getAdminGroups?: boolean) {
    if (getAdminGroups) {
      const groupsIamAdminIdList = await this.whatsappProvider.groupsIamAdmin();

      if (groupsIamAdminIdList && groupsIamAdminIdList[0] !== null) {
        const groupsIamAdminData = await Promise.all(
          groupsIamAdminIdList.map(async groupId => {
            const { title } = await this.whatsappProvider.getGroupInfo(groupId);

            const groupInfo = {
              id: groupId,
              title,
            };

            return groupInfo;
          }),
        );

        const filteredIamAdminGroupsInfo = groupsIamAdminData.filter(group => {
          const { title } = group;

          if (!title) {
            return false;
          }
          return true;
        });

        return filteredIamAdminGroupsInfo;
      }

      throw new AppError('Not possible to get admin groups');
    }
    const allGroupsIdList = await this.whatsappProvider.getAllGroups();

    const allGroupsData = await Promise.all(
      allGroupsIdList.map(async group => {
        const groupId = group.id;
        const { title } = await this.whatsappProvider.getGroupInfo(groupId);

        const groupInfo = {
          id: groupId,
          title,
        };

        return groupInfo;
      }),
    );

    const filteredAllGroupsInfo = allGroupsData.filter(group => {
      const { title } = group;

      if (!title) {
        return false;
      }
      return true;
    });

    return filteredAllGroupsInfo;
  }
}
