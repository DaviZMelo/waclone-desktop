import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class SetLinkModeService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,
  ) {}

  public async execute(linkMode: boolean): Promise<boolean> {
    await this.jsonDBProvider.setLinkMode(linkMode);

    return linkMode;
  }
}
