import IChatIDDTO from './IChatIDDTO';
import IMessageIDDTO from './IMessageIDDTO';

export default interface IMessageDTO {
  id: IMessageIDDTO;
  from: IChatIDDTO;
  to: IChatIDDTO;
  isGroupMsg: boolean;
  sender: any;
}
