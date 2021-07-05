import ICaptureEventFunction from '../dtos/ICaptureEventCallbackDTO';
import ICaptureMessageCallbackDTO from '../dtos/ICaptureMessageCallbackDTO';
import ICaptureStateChangedDTO from '../dtos/ICaptureStateChangedDTO';
import IChatDTO from '../dtos/IChatDTO';
import IChatIDDTO from '../dtos/IChatIDDTO';
import IContactIDDTO from '../dtos/IContactIDDTO';
import IGroupIDDTO from '../dtos/IGroupIDDTO';
import IMessageDTO from '../dtos/IMessageDTO';
import IMessageIDDTO from '../dtos/IMessageIDDTO';
import IWhatsappProvider from '../models/IWhatsappProvider';

export default class FakeWhatsappProvider implements IWhatsappProvider {
  public message = {
    from: '' as IChatIDDTO,
  } as IMessageDTO;

  private client: IWhatsappProvider;

  public async createInstance(): Promise<IWhatsappProvider> {
    return this.client;
  }

  public async logout() {
    return;
  }

  public async start() {
    return;
  }

  public onStateChanged(_stateCallback: ICaptureStateChangedDTO) {
    return;
  }

  public onMessage(_messageCallback: ICaptureMessageCallbackDTO) {
    return;
  }

  public onAnyMessage(_messageCallback: ICaptureMessageCallbackDTO) {
    return;
  }

  public captureEvents(_eventCallback: ICaptureEventFunction) {
    return;
  }

  public async addParticipant(
    _groupId: IGroupIDDTO,
    _participantID: IContactIDDTO | Array<IContactIDDTO>,
  ): Promise<boolean> {
    return true;
  }

  public async getHostNumber(): Promise<string> {
    return '5511964945942';
  }

  public async getGroupMembersId(
    _groupId: IGroupIDDTO,
  ): Promise<Array<IContactIDDTO>> {
    const groupMembersId = [
      '5511964945942@c.us',
      '5511964945943@c.us',
      '5511964945944@c.us',
    ] as IContactIDDTO[];
    return groupMembersId;
  }

  public async joinGroupViaLink(
    groupLink: string,
  ): Promise<IGroupIDDTO | string | number | boolean | IChatDTO> {
    return groupLink;
  }

  public async sendFile(
    _to: IChatIDDTO,
    _file: string,
    _filename: string,
    _caption: string,
    _quotedMsgId?: IMessageIDDTO,
  ): Promise<boolean | IMessageIDDTO> {
    return true;
  }

  public async reply(
    _to: IChatIDDTO,
    _content: string,
    _quotedMsgId: IMessageIDDTO,
  ): Promise<boolean | IMessageIDDTO> {
    return true;
  }

  public async groupsIamAdmin(): Promise<Array<IGroupIDDTO>> {
    const groupsIamAdmin = [
      `5511964945942-1620106486@g.us`,
      '5511964945942-1620106487@g.us',
    ] as IGroupIDDTO[];

    return groupsIamAdmin;
  }

  public async sendText(
    _to: IChatIDDTO,
    _content: string,
  ): Promise<boolean | IMessageIDDTO> {
    return true;
  }

  public async getGroupInviteLink(groupID: IGroupIDDTO): Promise<string> {
    return groupID;
  }

  public async getGroupInfo(groupID: IGroupIDDTO): Promise<any> {
    const groupInfo = {
      title: 'Title',
      id: groupID,
    };
    return groupInfo;
  }

  public async getChatProfilePic(_chatId: IChatIDDTO): Promise<string> {
    return 'https://image.com';
  }

  public async getAllGroups(
    _withNewMessagesOnly?: boolean,
  ): Promise<Array<IChatDTO>> {
    const allGroups = [
      {
        id: '5511964945942-1620106486@g.us' as IChatIDDTO,
      },
      {
        id: '5511964945942-1620106487@g.us' as IChatIDDTO,
      },
    ];

    return allGroups;
  }
}
