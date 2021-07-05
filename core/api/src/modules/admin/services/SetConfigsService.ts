import IConfigsDTO from '@shared/container/providers/JSONDBProvider/dtos/IConfigsDTO';
import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class SetConfigsService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,
  ) {}

  public async execute(configs: IConfigsDTO) {
    const { cloning } = configs;
    const { cloningContactsToAddPerDelay, cloningDelay } = cloning;

    if (
      cloningDelay &&
      (cloningDelay < 1 || cloningDelay > 180 || !Number(cloningDelay))
    ) {
      throw new AppError('Invalid delay ');
    }

    if (
      cloningContactsToAddPerDelay &&
      (cloningContactsToAddPerDelay < 1 || cloningContactsToAddPerDelay > 30)
    ) {
      throw new AppError('Invalid number of contacts to add per second');
    }

    await this.jsonDBProvider.setConfigs(configs);
  }
}
