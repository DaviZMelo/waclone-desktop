import ListConfigsService from '@modules/admin/services/ListConfigsService';
import SetConfigsService from '@modules/admin/services/SetConfigsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ConfigsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listContactsService = container.resolve(ListConfigsService);

    const configs = await listContactsService.execute();

    return response.json(configs);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const configs = request.body;
    const setConfigsService = container.resolve(SetConfigsService);

    await setConfigsService.execute(configs);

    return response.json(configs).status(200);
  }
}
