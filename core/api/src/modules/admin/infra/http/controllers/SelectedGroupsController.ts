import ListSelectedGroupsService from '@modules/admin/services/ListSelectedGroupsService';
import SetGroupsService from '@modules/admin/services/SetGroupsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SelectedGroupsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSelectedGroupsService = container.resolve(
      ListSelectedGroupsService,
    );

    const selectedGroups = await listSelectedGroupsService.execute();

    return response.json(selectedGroups).status(200);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { hostGroupId, targetGroupId, targetGroupLink } = request.body;
    const setGroupsService = container.resolve(SetGroupsService);

    await setGroupsService.execute({
      hostGroupId,
      targetGroupId,
      targetGroupLink,
    });

    return response.status(200).json();
  }
}
