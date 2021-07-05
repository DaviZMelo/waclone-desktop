import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class SetAllowedUsersService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,
  ) {}

  public async execute(newAllowedUsers: Array<number>): Promise<Array<number>> {
    const checkForDuplicateValuesInArray = (arrayToCheck: Array<number>) => {
      return new Set(arrayToCheck).size !== arrayToCheck.length;
    };

    const hasDuplicateNumbers = checkForDuplicateValuesInArray(newAllowedUsers);

    if (hasDuplicateNumbers) {
      throw new AppError('Duplicate numbers is not allowed', 422);
    }

    if (newAllowedUsers.length >= 3) {
      throw new AppError('Maximum users limit reached', 406);
    }

    newAllowedUsers.map(newAllowedUser => {
      if (
        Number.isNaN(newAllowedUser) ||
        newAllowedUser.toString().length !== 13
      ) {
        throw new AppError('Invalid phone number', 400);
      }

      return newAllowedUser;
    });

    await this.jsonDBProvider.setAllowedUsers(newAllowedUsers);

    return newAllowedUsers;
  }
}
