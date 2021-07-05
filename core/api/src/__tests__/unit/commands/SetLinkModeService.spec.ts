import SetLinkModeService from '@modules/commands/services/SetLinkModeService';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import MessageTemplate from '@shared/utils/MessageTemplate/implementations/MessageTemplate';
import WaError from '@shared/errors/WaError';

let setLinkMode: SetLinkModeService;

let fakeWhatsappProvider: FakeWhatsappProvider;
let fakeJsonDBProvider: FakeJsonDBProvider;
let messageTemplate: MessageTemplate;

describe('SetLinkMode', () => {
  beforeEach(() => {
    messageTemplate = new MessageTemplate();
    fakeWhatsappProvider = new FakeWhatsappProvider();
    fakeJsonDBProvider = new FakeJsonDBProvider();
    setLinkMode = new SetLinkModeService(
      fakeJsonDBProvider,
      messageTemplate,
      fakeWhatsappProvider,
    );
  });

  it('should be able to set link mode', async () => {
    await fakeJsonDBProvider.setLinkMessage('Fake Link Message');

    const response = await setLinkMode.execute('on');

    expect(response).toBe(true);
  });

  it('should not be able to set link mode if link message is not configured', async () => {
    await expect(setLinkMode.execute('on')).rejects.toBeInstanceOf(WaError);
  });

  it('should not be able to set link mode if the link mode provided is other than "off" or "on"', async () => {
    await fakeJsonDBProvider.setLinkMessage('Fake Link Message');

    await expect(setLinkMode.execute('fakeMode')).rejects.toBeInstanceOf(
      WaError,
    );
  });
});
