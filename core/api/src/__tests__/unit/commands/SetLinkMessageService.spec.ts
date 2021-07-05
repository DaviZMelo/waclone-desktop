import SetLinkMessageService from '@modules/commands/services/SetLinkMessageService';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import MessageTemplate from '@shared/utils/MessageTemplate/implementations/MessageTemplate';

let setLinkMessage: SetLinkMessageService;

let fakeWhatsappProvider: FakeWhatsappProvider;
let fakeJsonDBProvider: FakeJsonDBProvider;
let messageTemplate: MessageTemplate;

describe('SetLinkMessage', () => {
  beforeEach(() => {
    messageTemplate = new MessageTemplate();
    fakeWhatsappProvider = new FakeWhatsappProvider();
    fakeJsonDBProvider = new FakeJsonDBProvider();
    setLinkMessage = new SetLinkMessageService(
      fakeJsonDBProvider,
      messageTemplate,
      fakeWhatsappProvider,
    );
  });

  it('should be able to set link message', async () => {
    await setLinkMessage.execute('Fake Link Message');

    const linkMessage = await fakeJsonDBProvider.getLinkMessage();
    expect(linkMessage).toBe('Fake Link Message');
  });
});
