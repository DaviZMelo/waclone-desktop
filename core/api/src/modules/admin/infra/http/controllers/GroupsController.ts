import ListGroupsIamAdminService from '@modules/admin/services/ListGroupsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class GroupsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { admin_groups } = request.query;
    const listGroupsIamAdminService = container.resolve(
      ListGroupsIamAdminService,
    );

    const groupsIamAdmin = await listGroupsIamAdminService.execute(
      admin_groups === 'true',
    );

    return response.json(groupsIamAdmin);
  }
}
