import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import IGroupIDDTO from '@shared/container/providers/WhatsappProvider/dtos/IGroupIDDTO';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  hostGroupId: IGroupIDDTO;
  targetGroupId?: IGroupIDDTO;
  targetGroupLink?: string;
}
type IResponse = IRequest;

@injectable()
export default class SetGroupsService {
  constructor(
    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,

    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,
  ) {}

  public async execute({
    targetGroupId,
    hostGroupId,
    targetGroupLink,
  }: IRequest): Promise<IResponse> {
    const groups = {
      targetGroupId,
      hostGroupId,
    };

    if (!hostGroupId || (!targetGroupId && !targetGroupLink)) {
      throw new AppError('Some of the required values are empty.', 400);
    }

    if (targetGroupLink) {
      const joinedGroup = await this.whatsappProvider.joinGroupViaLink(
        targetGroupLink,
      );

      if (joinedGroup === 401) {
        throw new AppError(
          'You have been removed from this group previously',
          401,
        );
      }

      if (
        !joinedGroup ||
        typeof joinedGroup === 'number' ||
        typeof joinedGroup === 'boolean' ||
        joinedGroup === 'ERROR: ServerStatusCodeError'
      ) {
        throw new AppError('Invalid group link', 406);
      }

      groups.targetGroupId = joinedGroup as IGroupIDDTO;
    }

    await this.jsonDBProvider.setTargetGroupId(targetGroupId);
    await this.jsonDBProvider.setHostGroupId(hostGroupId);

    return groups;
  }
}
