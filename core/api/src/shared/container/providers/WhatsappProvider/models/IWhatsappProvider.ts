import { Client, Message } from '@open-wa/wa-automate';
import ICaptureEventCallbackDTO from '../dtos/ICaptureEventCallbackDTO';
import ICaptureStateChangedDTO from '../dtos/ICaptureStateChangedDTO';
import IChatDTO from '../dtos/IChatDTO';
import IChatIDDTO from '../dtos/IChatIDDTO';
import IContactIDDTO from '../dtos/IContactIDDTO';
import IGroupIDDTO from '../dtos/IGroupIDDTO';
import IMessageDTO from '../dtos/IMessageDTO';
import IMessageIDDTO from '../dtos/IMessageIDDTO';

export default interface IWhatsappProvider {
  message: IMessageDTO;
  createInstance(): Promise<Client | IWhatsappProvider>;
  logout(): Promise<void>;

  captureEvents(eventCallback: ICaptureEventCallbackDTO): void;
  onMessage(messageCallback: (message: Message) => void): void;
  onAnyMessage(messageCallback: (message: Message) => void): void;
  onStateChanged(stateCallback: ICaptureStateChangedDTO): void;

  addParticipant(
    groupId: IGroupIDDTO,
    participantID: IContactIDDTO | Array<IContactIDDTO>,
  ): Promise<boolean>;
  getHostNumber(): Promise<string>;
  getGroupMembersId(groupId: IGroupIDDTO): Promise<Array<IContactIDDTO>>;
  joinGroupViaLink(
    link: string,
  ): Promise<IGroupIDDTO | string | number | boolean | IChatDTO>;
  sendFile(
    to: IChatIDDTO,
    file: string,
    filename: string,
    caption: string,
    quotedMsgId?: IMessageIDDTO,
  ): Promise<boolean | IMessageIDDTO>;
  reply(
    to: IChatIDDTO,
    content: string,
    quotedMsgId: IMessageIDDTO,
  ): Promise<boolean | IMessageIDDTO>;
  groupsIamAdmin(): Promise<Array<IGroupIDDTO>>;
  sendText(to: IChatIDDTO, content: string): Promise<boolean | IMessageIDDTO>;
  getGroupInviteLink(groupID: IGroupIDDTO): Promise<string>;
  getGroupInfo(groupId: IChatIDDTO): Promise<any>;
  getChatProfilePic(chatId: IChatIDDTO): Promise<string>;
  getAllGroups(withNewMessagesOnly?: boolean): Promise<Array<IChatDTO>>;
}
