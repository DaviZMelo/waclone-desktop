import ShowLinkModeService from '@modules/admin/services/ShowLinkModeService';
import SetLinkModeService from '@modules/admin/services/SetLinkModeService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class LinkModeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showLinkModeService = container.resolve(ShowLinkModeService);

    const linkMode = await showLinkModeService.execute();

    return response.status(200).json(linkMode);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { linkMode } = request.body;
    const setLinkModeService = container.resolve(SetLinkModeService);

    await setLinkModeService.execute(linkMode);

    return response.status(200).json();
  }
}
