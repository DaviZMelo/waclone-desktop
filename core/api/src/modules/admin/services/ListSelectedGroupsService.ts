import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import { inject, injectable } from 'tsyringe';

interface IResponse {
  targetGroupId: string;
  hostGroupId: string;
}

@injectable()
export default class ListSelectedGroupsService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,
  ) {}

  public async execute(): Promise<IResponse> {
    const targetGroupId = await this.jsonDBProvider.getTargetGroupId();
    const hostGroupId = await this.jsonDBProvider.getHostGroupId();

    return {
      targetGroupId,
      hostGroupId,
    };
  }
}
