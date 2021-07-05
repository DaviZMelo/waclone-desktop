export default interface IMessageTemplate {
  errorMessage(message: string): string;
  warningMessage(message: string): string;
  successMessage(message: string): string;
}
