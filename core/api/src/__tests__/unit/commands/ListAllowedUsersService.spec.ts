import ListAllowedUsersService from '@modules/commands/services/ListAllowedUsersService';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import MessageTemplate from '@shared/utils/MessageTemplate/implementations/MessageTemplate';
import WaError from '@shared/errors/WaError';

let listAllowedUsersService: ListAllowedUsersService;

let fakeWhatsappProvider: FakeWhatsappProvider;
let fakeJsonDBProvider: FakeJsonDBProvider;

let messageTemplate: MessageTemplate;

describe('ListAllowedUsers', () => {
  beforeEach(() => {
    fakeWhatsappProvider = new FakeWhatsappProvider();
    fakeJsonDBProvider = new FakeJsonDBProvider();
    messageTemplate = new MessageTemplate();
    listAllowedUsersService = new ListAllowedUsersService(
      fakeJsonDBProvider,
      messageTemplate,
      fakeWhatsappProvider,
    );
  });

  it('should be able to list allowed users', async () => {
    await fakeJsonDBProvider.setAllowedUsers([5511964945942]);
    const response = await listAllowedUsersService.execute();

    expect(response).toEqual([5511964945942]);
  });

  it('should not be able to list allowed users if there are no allowed users', async () => {
    await expect(listAllowedUsersService.execute()).rejects.toBeInstanceOf(
      WaError,
    );
  });
});
