import ListContactsService from '@modules/admin/services/ListContactsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ContactsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { type } = request.query;

    const listContactsService = container.resolve(ListContactsService);

    const contacts = await listContactsService.execute(type as string);

    return response.json(contacts);
  }
}
