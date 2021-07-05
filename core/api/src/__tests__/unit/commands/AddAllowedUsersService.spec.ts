import AddAllowedUsersService from '@modules/commands/services/AddAllowedUsersService';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import MessageTemplate from '@shared/utils/MessageTemplate/implementations/MessageTemplate';
import WaError from '@shared/errors/WaError';

let addAllowedUsers: AddAllowedUsersService;

let fakeWhatsappProvider: FakeWhatsappProvider;
let fakeJsonDBProvider: FakeJsonDBProvider;
let messageTemplate: MessageTemplate;

describe('AddAllowedUsers', () => {
  beforeEach(() => {
    messageTemplate = new MessageTemplate();
    fakeWhatsappProvider = new FakeWhatsappProvider();
    fakeJsonDBProvider = new FakeJsonDBProvider();
    addAllowedUsers = new AddAllowedUsersService(
      fakeJsonDBProvider,
      messageTemplate,
      fakeWhatsappProvider,
    );
  });

  it('should be able to add a allowed user', async () => {
    await addAllowedUsers.execute(5511964945942);

    const allowedUsers = await fakeJsonDBProvider.getAllowedUsers();
    expect(allowedUsers).toEqual(expect.arrayContaining([5511964945942]));
  });

  it('should be able to add a allowed user with invalid phone', async () => {
    await expect(addAllowedUsers.execute(0)).rejects.toBeInstanceOf(WaError);
  });

  it('should not be able to add a allowed user if your phone is already registered', async () => {
    await fakeJsonDBProvider.addAllowedUser(5511964945942);

    await expect(addAllowedUsers.execute(5511964945942)).rejects.toBeInstanceOf(
      WaError,
    );
  });
});
