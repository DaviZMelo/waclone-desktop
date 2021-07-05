import ShowMasterUserService from '@modules/admin/services/ShowMasterUserService';
import SetMasterUserService from '@modules/admin/services/SetMasterUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class MasterUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showMasterUserService = container.resolve(ShowMasterUserService);

    const masterUser = await showMasterUserService.execute();

    return response.json(masterUser);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { phone } = request.query;
    const setMasterUserService = container.resolve(SetMasterUserService);

    await setMasterUserService.execute(Number(phone));

    return response.status(200).json();
  }
}
