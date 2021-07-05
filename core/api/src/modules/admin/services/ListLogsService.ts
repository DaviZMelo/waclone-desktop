import ILogsDTO from '@shared/container/providers/JSONDBProvider/dtos/ILogsDTO';
import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListLogsService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,
  ) {}

  public async execute(): Promise<Array<ILogsDTO>> {
    const logs = await this.jsonDBProvider.getLogs();

    return logs;
  }
}
