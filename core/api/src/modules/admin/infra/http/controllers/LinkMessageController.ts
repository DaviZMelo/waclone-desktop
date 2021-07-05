import ShowLinkMessageService from '@modules/admin/services/ShowLinkMessageService';
import SetLinkMessageService from '@modules/admin/services/SetLinkMessageService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class LinkMessageController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showLinkMessageService = container.resolve(ShowLinkMessageService);

    const linkMessage = await showLinkMessageService.execute();

    return response.status(200).json(linkMessage);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { linkMessage } = request.body;
    const setLinkMessageService = container.resolve(SetLinkMessageService);

    await setLinkMessageService.execute(linkMessage);

    return response.status(200).json();
  }
}
