import 'reflect-metadata';
import { Client, create, ev, NotificationLanguage } from '@open-wa/wa-automate';
import { container } from 'tsyringe';
import path from 'path';

import ICaptureEventFunction from '../dtos/ICaptureEventCallbackDTO';
import IWhatsappProvider from '../models/IWhatsappProvider';
import IGroupIDDTO from '../dtos/IGroupIDDTO';
import IMessageIDDTO from '../dtos/IMessageIDDTO';
import IChatIDDTO from '../dtos/IChatIDDTO';
import IContactIDDTO from '../dtos/IContactIDDTO';
import IChatDTO from '../dtos/IChatDTO';
import IMessageDTO from '../dtos/IMessageDTO';
import ICaptureMessageCallbackDTO from '../dtos/ICaptureMessageCallbackDTO';
import ICaptureStateChangedDTO from '../dtos/ICaptureStateChangedDTO';

export default class WaAutomateProvider implements IWhatsappProvider {
  public message: IMessageDTO;

  private client: Client;

  public async createInstance(): Promise<Client> {
    const createdInstance = await create({
      hostNotificationLang: NotificationLanguage.PTBR,
      disableSpins: true,
      useChrome: true,
      callTimeout: 0,
      sessionDataPath: path.resolve(__dirname, '../../../../../../')
    });

    this.client = createdInstance;
    this.start(createdInstance);

    return createdInstance;
  }

  public async logout() {
    await this.client.kill();
  }

  private start(client: Client) {
    container.registerInstance<Client>('Client', client);

    this.client = client;
  }

  public onStateChanged(stateCallback: ICaptureStateChangedDTO) {
    this.client.onStateChanged(async state => {
      stateCallback(state);
      if (state === 'CONFLICT' || state === 'UNLAUNCHED')
        this.client.forceRefocus();

      if (state === 'UNPAIRED') {
        await this.logout();
      }
    });
  }

  public onMessage(messageCallback: ICaptureMessageCallbackDTO) {
    this.client.onMessage(async message => {
      messageCallback(message);
    });
  }

  public onAnyMessage(messageCallback: ICaptureMessageCallbackDTO) {
    this.client.onAnyMessage(async message => {
      messageCallback(message);
    });
  }

  public captureEvents(eventCallback: ICaptureEventFunction) {
    ev.on('qr.**', qrcode => {
      eventCallback('qrcode', qrcode);
      console.log('Enviando QRCode');
    });
  }

  public async addParticipant(
    groupId: IGroupIDDTO,
    participantID: IContactIDDTO | Array<IContactIDDTO>,
  ): Promise<boolean> {
    return this.client.addParticipant(groupId, participantID as IContactIDDTO);
  }

  public async getHostNumber(): Promise<string> {
    const myPhoneNumber = await this.client.getHostNumber();
    return myPhoneNumber;
  }

  public async getGroupMembersId(
    groupId: IGroupIDDTO,
  ): Promise<Array<IContactIDDTO>> {
    const groupIdList = await this.client.getGroupMembersId(groupId);

    return groupIdList;
  }

  public async joinGroupViaLink(
    groupLink: string,
  ): Promise<IGroupIDDTO | string | number | boolean | IChatDTO> {
    const joinedGroup = await this.client.joinGroupViaLink(groupLink);

    return joinedGroup;
  }

  public async sendFile(
    to: IChatIDDTO,
    file: string,
    filename: string,
    caption: string,
    quotedMsgId?: IMessageIDDTO,
  ): Promise<boolean | IMessageIDDTO> {
    return this.client.sendFile(to, file, filename, caption, quotedMsgId);
  }

  public async reply(
    to: IChatIDDTO,
    content: string,
    quotedMsgId: IMessageIDDTO,
  ): Promise<boolean | IMessageIDDTO> {
    const repliedMessage = await this.client.reply(to, content, quotedMsgId);

    return repliedMessage;
  }

  public async groupsIamAdmin(): Promise<Array<IGroupIDDTO>> {
    const groupsIamAdminIDlist = await this.client.iAmAdmin();
    return groupsIamAdminIDlist;
  }

  public async sendText(
    to: IChatIDDTO,
    content: string,
  ): Promise<boolean | IMessageIDDTO> {
    return this.client.sendText(to, content);
  }

  public async getGroupInviteLink(groupID: IGroupIDDTO): Promise<string> {
    const groupInviteLink = await this.client.getGroupInviteLink(groupID);
    return groupInviteLink;
  }

  public async getGroupInfo(groupId: IGroupIDDTO): Promise<any> {
    return this.client.getGroupInfo(groupId);
  }

  public async getChatProfilePic(chatId: IChatIDDTO): Promise<string> {
    return this.client.getProfilePicFromServer(chatId);
  }

  public async getAllGroups(
    withNewMessagesOnly?: boolean,
  ): Promise<Array<IChatDTO>> {
    const allGroups = await this.client.getAllGroups(withNewMessagesOnly);

    return allGroups;
  }
}
