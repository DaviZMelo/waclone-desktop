import IConfigsDTO from '../dtos/IConfigsDTO';
import ILogsDTO from '../dtos/ILogsDTO';
import IContactIDDTO from '../../WhatsappProvider/dtos/IContactIDDTO';
import IGroupIDDTO from '../../WhatsappProvider/dtos/IGroupIDDTO';
import IJSONDBProvider from '../models/IJSONDBProvider';

export default class FakeJsonDBProvider implements IJSONDBProvider {
  private fakeDB = {
    cloning: {},
    groups: {},
    links: {},
    logs: {},
    logsConfigs: {},
    users: {
      allowedUsers: [],
    },
  } as IConfigsDTO;

  public async setDelay(delay: number): Promise<void> {
    this.fakeDB.cloning.cloningDelay = delay;
  }

  public async getDelay(): Promise<number> {
    return this.fakeDB.cloning.cloningDelay;
  }

  public async setHostGroupId(groupId: IGroupIDDTO): Promise<void> {
    this.fakeDB.groups.hostGroupId = groupId;
  }

  public async getHostGroupId(): Promise<IGroupIDDTO> {
    return this.fakeDB.groups.hostGroupId;
  }

  public async setTargetGroupId(groupId: IGroupIDDTO): Promise<void> {
    this.fakeDB.groups.targetGroupId = groupId;
  }

  public async getTargetGroupId(): Promise<IGroupIDDTO> {
    return this.fakeDB.groups.targetGroupId;
  }

  public async setLinkMode(status: boolean): Promise<void> {
    this.fakeDB.links.linkMode = status;
  }

  public async getLinkMode(): Promise<boolean> {
    return this.fakeDB.links.linkMode;
  }

  public async setLinkMessage(message: string): Promise<void> {
    this.fakeDB.links.linkMessage = message;
  }

  public async getLinkMessage(): Promise<string> {
    return this.fakeDB.links.linkMessage;
  }

  public async setContacts(contacts: Array<IContactIDDTO>): Promise<void> {
    this.fakeDB.cloning.cloningContacts = contacts;
  }

  public async getContacts(): Promise<Array<IContactIDDTO>> {
    return this.fakeDB.cloning.cloningContacts;
  }

  public async findAllowedUser(contact: number): Promise<number> {
    const foundAllowedUser = this.fakeDB.users.allowedUsers.find(
      allowedUser => allowedUser === contact,
    );

    return foundAllowedUser;
  }

  public async getAllowedUsers(): Promise<Array<number>> {
    return this.fakeDB.users.allowedUsers;
  }

  public async addAllowedUser(allowedUser: number): Promise<void> {
    this.fakeDB.users.allowedUsers.push(allowedUser);
  }

  public async setAllowedUsers(
    contacts: Array<number>,
  ): Promise<Array<number>> {
    this.fakeDB.users.allowedUsers = contacts;
    return this.fakeDB.users.allowedUsers;
  }

  public async removeAllowedUser(contact: number): Promise<void> {
    const newArray = this.fakeDB.users.allowedUsers.filter(
      allowedUser => allowedUser !== contact,
    );
    this.fakeDB.users.allowedUsers = newArray;
  }

  public async setLogGroup(groupId: IGroupIDDTO): Promise<void> {
    this.fakeDB.logsConfigs.logGroupId = groupId;
  }

  public async getLogGroup(): Promise<string> {
    return this.fakeDB.logsConfigs.logGroupId;
  }

  public async setLogMode(status: boolean): Promise<void> {
    this.fakeDB.logsConfigs.logMode = status;
  }

  public async getLogMode(): Promise<boolean> {
    return this.fakeDB.logsConfigs.logMode;
  }

  public async getMasterUser(): Promise<number> {
    return this.fakeDB.users.masterUser;
  }

  public async setMasterUser(masterUser: number): Promise<void> {
    this.fakeDB.users.masterUser = masterUser;
  }

  public async setLogs(logs: Array<ILogsDTO>): Promise<void> {
    this.fakeDB.logs = logs;
  }

  public async getLogs(): Promise<Array<ILogsDTO>> {
    return this.fakeDB.logs;
  }

  public async setNumberOfContactsToAddPerDelay(
    numberOfContactsToAdd: number,
  ): Promise<void> {
    this.fakeDB.cloning.cloningContactsToAddPerDelay = numberOfContactsToAdd;
  }

  public async getNumberOfContactsToAddPerDelay(): Promise<number> {
    return this.fakeDB.cloning.cloningContactsToAddPerDelay;
  }

  public async setConfigs(configs: IConfigsDTO): Promise<IConfigsDTO> {
    const newConfigs = Object.assign(this.fakeDB, configs);
    this.fakeDB = newConfigs;

    return this.fakeDB;
  }

  public async getConfigs(): Promise<IConfigsDTO> {
    return this.fakeDB;
  }
}
