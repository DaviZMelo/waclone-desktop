import RemoveAllowedUserService from '@modules/commands/services/RemoveAllowedUserService';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import WaError from '@shared/errors/WaError';
import MessageTemplate from '@shared/utils/MessageTemplate/implementations/MessageTemplate';

let removeAllowedUser: RemoveAllowedUserService;

let fakeWhatsappProvider: FakeWhatsappProvider;
let fakeJsonDBProvider: FakeJsonDBProvider;
let messageTemplate: MessageTemplate;

describe('RemoveAllowedUser', () => {
  beforeEach(() => {
    fakeWhatsappProvider = new FakeWhatsappProvider();
    fakeJsonDBProvider = new FakeJsonDBProvider();
    messageTemplate = new MessageTemplate();
    removeAllowedUser = new RemoveAllowedUserService(
      fakeJsonDBProvider,
      messageTemplate,
      fakeWhatsappProvider,
    );
  });

  it('should be able to remove allowed user', async () => {
    await fakeJsonDBProvider.setAllowedUsers([5511964945942, 5511964945943]);

    await removeAllowedUser.execute(5511964945943);

    const allowedUsers = await fakeJsonDBProvider.getAllowedUsers();

    expect(allowedUsers).toEqual([5511964945942]);
  });

  it('should not be able to remove allowed user if the informed allowed users not exists', async () => {
    await expect(
      removeAllowedUser.execute(5511964945942),
    ).rejects.toBeInstanceOf(WaError);
  });
});
