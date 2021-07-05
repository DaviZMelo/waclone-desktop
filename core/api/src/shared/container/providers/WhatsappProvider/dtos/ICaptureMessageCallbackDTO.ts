import { Message } from '@open-wa/wa-automate';

export default interface ICaptureMessageCallbackDTO {
  (message: Message): void;
}
