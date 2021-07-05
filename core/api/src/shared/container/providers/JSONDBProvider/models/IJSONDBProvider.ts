import IContactIDDTO from '../../WhatsappProvider/dtos/IContactIDDTO';
import IGroupIDDTO from '../../WhatsappProvider/dtos/IGroupIDDTO';
import IConfigsDTO from '../dtos/IConfigsDTO';
import ILogsDTO from '../dtos/ILogsDTO';

export default interface IJSONDBProvider {
  setDelay(delay: number): Promise<void>;
  getDelay(): Promise<number>;

  setHostGroupId(groupId: string): Promise<void>;
  setTargetGroupId(groupId: string): Promise<void>;

  getHostGroupId(): Promise<IGroupIDDTO>;
  getTargetGroupId(): Promise<IGroupIDDTO>;

  setLinkMode(status: boolean): Promise<void>;
  getLinkMode(): Promise<boolean>;

  setLinkMessage(message: string): Promise<void>;
  getLinkMessage(): Promise<string>;

  findAllowedUser(contact: number): Promise<number>;
  setAllowedUsers(contacts: Array<number>): Promise<Array<number>>;
  getAllowedUsers(): Promise<Array<number>>;

  addAllowedUser(contact: number): Promise<void>;
  removeAllowedUser(contact: number): Promise<void>;

  setContacts(contacts: Array<IContactIDDTO>): Promise<void>;
  getContacts(): Promise<Array<IContactIDDTO>>;

  setLogGroup(groupId: string): Promise<void>;
  getLogGroup(): Promise<string>;

  getLogs(): Promise<Array<ILogsDTO>>;
  setLogs(logs: Array<ILogsDTO>): Promise<void>;

  setLogMode(status: boolean): Promise<void>;
  getLogMode(): Promise<boolean>;

  getMasterUser(): Promise<number>;
  setMasterUser(masterUser: number): Promise<void>;

  setNumberOfContactsToAddPerDelay(
    numberOfContactsToAddPerDelay: number,
  ): Promise<void>;
  getNumberOfContactsToAddPerDelay(): Promise<number>;

  setConfigs(configs: IConfigsDTO): Promise<IConfigsDTO>;
  getConfigs(): Promise<IConfigsDTO>;
}
