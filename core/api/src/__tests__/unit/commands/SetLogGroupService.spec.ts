import SetLogGroupService from '@modules/commands/services/SetLogGroupService';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import MessageTemplate from '@shared/utils/MessageTemplate/implementations/MessageTemplate';
import IChatIDDTO from '@shared/container/providers/WhatsappProvider/dtos/IChatIDDTO';
import WaError from '@shared/errors/WaError';

let setLogGroup: SetLogGroupService;

let fakeWhatsappProvider: FakeWhatsappProvider;
let fakeJsonDBProvider: FakeJsonDBProvider;
let messageTemplate: MessageTemplate;

describe('SetLogGroup', () => {
  beforeEach(() => {
    messageTemplate = new MessageTemplate();
    fakeWhatsappProvider = new FakeWhatsappProvider();
    fakeJsonDBProvider = new FakeJsonDBProvider();
    setLogGroup = new SetLogGroupService(
      fakeJsonDBProvider,
      messageTemplate,
      fakeWhatsappProvider,
    );
  });

  it('should be able to set log group', async () => {
    fakeWhatsappProvider.message.isGroupMsg = true;
    fakeWhatsappProvider.message.from = 'fakeGroupId' as IChatIDDTO;

    await setLogGroup.execute();
    const logGroup = await fakeJsonDBProvider.getLogGroup();

    expect(logGroup).toBe('fakeGroupId');
  });

  it('should not be able to set log group if the chat where the command was sent is not a group', async () => {
    fakeWhatsappProvider.message.isGroupMsg = false;

    await expect(setLogGroup.execute()).rejects.toBeInstanceOf(WaError);
  });
});
