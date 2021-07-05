import StartCloningService from '@modules/admin/services/StartCloningService';
import StopCloningService from '@modules/admin/services/StopCloningService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CloningController {
  public async create(request: Request, response: Response): Promise<Response> {
    const startCloningService = container.resolve(StartCloningService);

    await startCloningService.execute();

    return response.status(200).json();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const stopCloningService = container.resolve(StopCloningService);

    await stopCloningService.execute();

    return response.status(200).json();
  }
}
