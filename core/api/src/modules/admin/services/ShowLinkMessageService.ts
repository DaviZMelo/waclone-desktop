import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ShowLinkMessageService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,
  ) {}

  public async execute() {
    const linkMessage = await this.jsonDBProvider.getLinkMessage();

    return linkMessage;
  }
}
