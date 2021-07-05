export default class LogError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly date: Date;

  constructor(message: string) {
    this.message = message;
    this.date = new Date();
  }
}
