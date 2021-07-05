import { Client, Message } from '@open-wa/wa-automate';

export default interface IHandleCommandsDTO {
  message: Message;
  client: Client;
  command: string;
  params: Array<string>;
}
