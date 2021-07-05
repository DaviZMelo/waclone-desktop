import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListAllowedUsersService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,
  ) {}

  public async execute(): Promise<Array<number>> {
    const allowedUsers = await this.jsonDBProvider.getAllowedUsers();

    return allowedUsers;
  }
}
