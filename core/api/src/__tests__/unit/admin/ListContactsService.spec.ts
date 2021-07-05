import ListContactsService from '@modules/admin/services/ListContactsService';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeVCardProvider from '@shared/container/providers/VCardProvider/fakes/FakeVCardProvider';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import AppError from '@shared/errors/AppError';

let fakeWhatsappProvider: FakeWhatsappProvider;
let fakeJsonDBProvider: FakeJsonDBProvider;
let fakeVCardProvider: FakeVCardProvider;
let fakeStorageProvider: FakeStorageProvider;

let listContacts: ListContactsService;

describe('GetContacts', () => {
  beforeEach(async () => {
    fakeWhatsappProvider = new FakeWhatsappProvider();
    fakeJsonDBProvider = new FakeJsonDBProvider();
    fakeVCardProvider = new FakeVCardProvider();
    fakeStorageProvider = new FakeStorageProvider();
    listContacts = new ListContactsService(
      fakeWhatsappProvider,
      fakeJsonDBProvider,
      fakeVCardProvider,
      fakeStorageProvider,
    );

    await fakeJsonDBProvider.setMasterUser(5511964945942);
  });

  it('should be able to get contacts with type download', async () => {
    await fakeJsonDBProvider.setContacts(['5511964945942@c.us']);

    const contacts = await listContacts.execute('download');

    expect(typeof contacts).toBe('string');
  });

  it('should be able to get contacts with type sendByMessage', async () => {
    await fakeJsonDBProvider.setContacts(['5511964945942@c.us']);

    const contacts = await listContacts.execute('sendByMessage');

    expect(contacts).toBe(true);
  });

  it('should not be able to get contacts without a valid type', async () => {
    await expect(listContacts.execute('')).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to try to send file two times', async () => {
    await fakeJsonDBProvider.setContacts(['5511964945942@c.us']);

    const sendFileFunction = jest
      .spyOn(fakeWhatsappProvider, 'sendFile')
      .mockImplementationOnce(async () => true)
      .mockImplementationOnce(async () => false);

    await listContacts.execute('sendByMessage');

    expect(sendFileFunction).toHaveBeenCalledTimes(3);
  });

  it('should be able to modify the masterUser number to perform the second sendFile attempt', async () => {
    await fakeJsonDBProvider.setContacts(['5511964945942@c.us']);
    await fakeJsonDBProvider.setMasterUser(5511964945943);

    const mockedSendFile = jest
      .spyOn(fakeWhatsappProvider, 'sendFile')
      .mockImplementation(async () => false);

    await listContacts.execute('sendByMessage');
    await fakeJsonDBProvider.setMasterUser(551164945944);
    await listContacts.execute('sendByMessage');

    const fixedNumber1 = mockedSendFile.mock.calls[2][0];
    const fixedNumber2 = mockedSendFile.mock.calls[5][0];

    expect(fixedNumber1).toBe(`551164945943@c.us`);
    expect(fixedNumber2).toBe(`5511964945944@c.us`);
  });
});
