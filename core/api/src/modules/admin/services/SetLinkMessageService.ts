import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class SetLinkMessageService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,
  ) {}

  public async execute(message: string): Promise<string> {
    if (message.length >= 63536) {
      throw new AppError(
        'This message exceeded the characters limit of whatsapp',
      );
    }

    await this.jsonDBProvider.setLinkMessage(message);

    return message;
  }
}
