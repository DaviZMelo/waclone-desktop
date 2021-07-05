import ListLogsService from '@modules/admin/services/ListLogsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class LogsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listLogsService = container.resolve(ListLogsService);

    const logs = await listLogsService.execute();

    return response.json(logs);
  }
}
