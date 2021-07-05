import '../schemas/schema.json';
import lowdb from 'lowdb';
import fs from 'fs';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';
import IContactIDDTO from '../../WhatsappProvider/dtos/IContactIDDTO';
import IGroupIDDTO from '../../WhatsappProvider/dtos/IGroupIDDTO';
import IConfigsDTO from '../dtos/IConfigsDTO';
import ILogsDTO from '../dtos/ILogsDTO';
import IJSONDBProvider from '../models/IJSONDBProvider';

const dbFile = path.resolve(
  __dirname,
  '../',
  '../',
  '../',
  '../',
  '../',
  `database/db.json`,
);

const dbFileExists = fs.existsSync(dbFile);
const dbSchema = fs.readFileSync(
  path.resolve(__dirname, '../', 'schemas/schema.json'),
);

if (!dbFileExists) {
  fs.mkdirSync(
    path.resolve(__dirname, '../', '../', '../', '../', '../', 'database'),
  );
  fs.writeFileSync(dbFile, dbSchema);
}

const adapter = new FileSync<IConfigsDTO>(dbFile);
const db = lowdb(adapter);

export default class LowDBProvider implements IJSONDBProvider {
  public async setDelay(delay: number): Promise<void> {
    await db.set('cloning.delay', delay).write();
  }

  public async getDelay(): Promise<number> {
    return db.get('cloning.delay').value();
  }

  public async setHostGroupId(groupId: IGroupIDDTO): Promise<void> {
    await db.set('groups.hostGroupId', groupId).write();
  }

  public async getHostGroupId(): Promise<IGroupIDDTO> {
    return db.get('groups.hostGroupId').value() as IGroupIDDTO;
  }

  public async setTargetGroupId(groupId: IGroupIDDTO): Promise<void> {
    await db.set('groups.targetGroupId', groupId).write();
  }

  public async getTargetGroupId(): Promise<IGroupIDDTO> {
    return db.get('groups.targetGroupId').value() as IGroupIDDTO;
  }

  public async setLinkMode(status: boolean): Promise<void> {
    await db.set('links.linkMode', status).write();
  }

  public async getLinkMode(): Promise<boolean> {
    return db.get('links.linkMode').value();
  }

  public async setLinkMessage(message: string): Promise<void> {
    return db.set('links.linkMessage', message).write();
  }

  public async getLinkMessage(): Promise<string> {
    return db.get('links.linkMessage').value();
  }

  public async setContacts(contacts: Array<IContactIDDTO>): Promise<void> {
    await db.set('cloning.cloningContacts', contacts).write();
  }

  public async getContacts(): Promise<Array<IContactIDDTO>> {
    return db.get('cloning.cloningContacts').value();
  }

  public async findAllowedUser(contact: number): Promise<number> {
    const foundAllowedUser = db
      .get('users.allowedUsers')
      .value()
      .find((allowedUser: number) => allowedUser === contact);

    return foundAllowedUser;
  }

  public async getAllowedUsers(): Promise<Array<number>> {
    return db.get('users.allowedUsers').value();
  }

  public async setAllowedUsers(
    contacts: Array<number>,
  ): Promise<Array<number>> {
    return db.set('users.allowedUsers', contacts).write();
  }

  public async addAllowedUser(contact: number): Promise<void> {
    await db.get('users').get('allowedUsers').push(contact).write();
  }

  public async removeAllowedUser(contact: number): Promise<void> {
    await db.get('users').get('allowedUsers').pull(contact).write();
  }

  public async setLogGroup(groupId: string): Promise<void> {
    await db.set('logsConfig.logGroup', groupId).write();
  }

  public async getLogGroup(): Promise<string> {
    return db.get('logsConfig.logGroup').value();
  }

  public async setLogMode(status: boolean): Promise<void> {
    await db.set('logsConfig.logMode', status).write();
  }

  public async getLogMode(): Promise<boolean> {
    return db.get('logsConfig.logMode').value();
  }

  public async getMasterUser(): Promise<number> {
    return db.get('users.masterUser').value();
  }

  public async setMasterUser(masterUser: number): Promise<void> {
    await db.set('users.masterUser', masterUser).write();
  }

  public async setLogs(logs: Array<ILogsDTO>): Promise<void> {
    await db.set('logs', logs).write();
  }

  public async getLogs(): Promise<Array<ILogsDTO>> {
    return db.get('logs').value();
  }

  public async setNumberOfContactsToAddPerDelay(
    numberOfContactsToAddPerDelay: number,
  ): Promise<void> {
    await db
      .set(
        'general.numberOfContactsToAddPerDelay',
        numberOfContactsToAddPerDelay,
      )
      .write();
  }

  public async getNumberOfContactsToAddPerDelay(): Promise<number> {
    return db.get('cloning.cloningContactsToAddPerDelay').value();
  }

  public async setConfigs(configs: IConfigsDTO): Promise<IConfigsDTO> {
    const oldConfigs = db.getState();
    const newConfigs = Object.assign(oldConfigs || {}, {
      ...configs,
    });

    return db.setState(newConfigs).write();
  }

  public async getConfigs(): Promise<IConfigsDTO> {
    const configs = db.getState();
    return configs;
  }
}
