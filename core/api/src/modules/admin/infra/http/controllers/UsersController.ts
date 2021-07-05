import ListAllowedUsersService from '@modules/admin/services/ListAllowedUsersService';
import SetAllowedUsersService from '@modules/admin/services/SetAllowedUsersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllowedUsersService = container.resolve(ListAllowedUsersService);

    const allowedUsers = await listAllowedUsersService.execute();

    return response.status(200).json(allowedUsers);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const allowedUsers = request.body;
    const setAllowedUsersService = container.resolve(SetAllowedUsersService);

    await setAllowedUsersService.execute(allowedUsers);

    return response.status(200).json();
  }
}
