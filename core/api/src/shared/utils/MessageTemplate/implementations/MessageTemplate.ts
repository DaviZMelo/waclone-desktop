import IMessageTemplate from '../models/IMessageTemplate';

export default class MessageTemplate implements IMessageTemplate {
  public errorMessage(message: string): string {
    return `🚨 ➫ *${message}*`;
  }

  public warningMessage(message: string): string {
    return `⚠️ ➫ *${message}*`;
  }

  public successMessage(message: string): string {
    return `✅ ➫ *${message}*`;
  }
}
