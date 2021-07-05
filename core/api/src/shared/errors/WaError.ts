export default class WaError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string) {
    this.message = message;
  }
}
