import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ShowMasterUserService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,
  ) {}

  public async execute(): Promise<number> {
    const masterUser = await this.jsonDBProvider.getMasterUser();

    return masterUser;
  }
}
