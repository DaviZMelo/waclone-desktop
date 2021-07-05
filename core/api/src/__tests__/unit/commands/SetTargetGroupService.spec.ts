import SetTargetGroupService from '@modules/commands/services/SetTargetGroupService';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import MessageTemplate from '@shared/utils/MessageTemplate/implementations/MessageTemplate';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeVCardProvider from '@shared/container/providers/VCardProvider/fakes/FakeVCardProvider';
import WaError from '@shared/errors/WaError';

let setTargetGroup: SetTargetGroupService;

let fakeWhatsappProvider: FakeWhatsappProvider;
let fakeJsonDBProvider: FakeJsonDBProvider;
let fakeStorageProvider: FakeStorageProvider;
let fakeVCardProvider: FakeVCardProvider;

let messageTemplate: MessageTemplate;

describe('SetTargetGroup', () => {
  beforeEach(() => {
    fakeWhatsappProvider = new FakeWhatsappProvider();
    fakeJsonDBProvider = new FakeJsonDBProvider();
    fakeStorageProvider = new FakeStorageProvider();
    fakeVCardProvider = new FakeVCardProvider();
    messageTemplate = new MessageTemplate();
    setTargetGroup = new SetTargetGroupService(
      fakeJsonDBProvider,
      fakeStorageProvider,
      fakeVCardProvider,
      messageTemplate,
      fakeWhatsappProvider,
    );
  });

  it('should be able to set target group', async () => {
    const setTargetGroupIdFunction = jest.spyOn(
      fakeJsonDBProvider,
      'setTargetGroupId',
    );

    const response = await setTargetGroup.execute(
      'chat.whatsapp/fakeTargetGroupLink',
    );

    expect(typeof response).toBe('string');
    expect(setTargetGroupIdFunction).toHaveBeenCalledTimes(1);
  });

  it('should not be able to set target group if a invalid group link is given', async () => {
    await expect(
      setTargetGroup.execute('invalidGroupLink'),
    ).rejects.toBeInstanceOf(WaError);
  });

  it('should not be able to set target group if it is not possible to enter in the group', async () => {
    jest
      .spyOn(fakeWhatsappProvider, 'joinGroupViaLink')
      .mockImplementation(async () => {
        return false;
      });
    await expect(
      setTargetGroup.execute('chat.whatsapp/fakeTargetGroupLink'),
    ).rejects.toBeInstanceOf(WaError);
  });
});
