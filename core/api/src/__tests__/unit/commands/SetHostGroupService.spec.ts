import SetHostGroupService from '@modules/commands/services/SetHostGroupService';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import MessageTemplate from '@shared/utils/MessageTemplate/implementations/MessageTemplate';
import IChatIDDTO from '@shared/container/providers/WhatsappProvider/dtos/IChatIDDTO';
import IGroupIDDTO from '@shared/container/providers/WhatsappProvider/dtos/IGroupIDDTO';
import WaError from '@shared/errors/WaError';

let setHostGroup: SetHostGroupService;

let fakeWhatsappProvider: FakeWhatsappProvider;
let fakeJsonDBProvider: FakeJsonDBProvider;
let messageTemplate: MessageTemplate;

describe('SetHostGroup', () => {
  beforeEach(() => {
    fakeWhatsappProvider = new FakeWhatsappProvider();
    fakeJsonDBProvider = new FakeJsonDBProvider();
    messageTemplate = new MessageTemplate();
    setHostGroup = new SetHostGroupService(
      fakeJsonDBProvider,
      messageTemplate,
      fakeWhatsappProvider,
    );
  });

  it('should be able to set host group', async () => {
    jest
      .spyOn(fakeWhatsappProvider, 'groupsIamAdmin')
      .mockImplementation(async () => {
        return ['fakeGroupId' as IGroupIDDTO];
      });
    fakeWhatsappProvider.message.isGroupMsg = true;
    fakeWhatsappProvider.message.from = 'fakeGroupId' as IChatIDDTO;

    const response = await setHostGroup.execute();

    expect(response).toBe('fakeGroupId');
  });

  it('should not be able to set log group if the chat where the command was sent is not a group', async () => {
    fakeWhatsappProvider.message.isGroupMsg = false;
    fakeWhatsappProvider.message.from = 'fakeGroupId' as IChatIDDTO;

    jest
      .spyOn(fakeWhatsappProvider, 'groupsIamAdmin')
      .mockImplementation(async () => {
        return ['fakeGroupId' as IGroupIDDTO];
      });

    await expect(setHostGroup.execute()).rejects.toBeInstanceOf(WaError);
  });

  it('should not be able to set log group if the bot is not a group admin', async () => {
    fakeWhatsappProvider.message.isGroupMsg = true;

    await expect(setHostGroup.execute()).rejects.toBeInstanceOf(WaError);
  });
});
