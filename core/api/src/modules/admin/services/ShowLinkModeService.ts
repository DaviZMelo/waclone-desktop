import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ShowLinkModeService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,
  ) {}

  public async execute(): Promise<boolean> {
    const linkMode = await this.jsonDBProvider.getLinkMode();

    return linkMode;
  }
}
