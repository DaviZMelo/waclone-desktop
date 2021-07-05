import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class LogoutWhatsappService {
  constructor(
    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public async execute() {
    this.whatsappProvider.logout();
  }
}
