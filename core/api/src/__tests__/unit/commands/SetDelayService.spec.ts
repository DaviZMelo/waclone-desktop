import SetDelayService from '@modules/commands/services/SetDelayService';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import WaError from '@shared/errors/WaError';
import MessageTemplate from '@shared/utils/MessageTemplate/implementations/MessageTemplate';

let setDelay: SetDelayService;

let fakeWhatsappProvider: FakeWhatsappProvider;
let fakeJsonDBProvider: FakeJsonDBProvider;
let messageTemplate: MessageTemplate;

describe('SetDelay', () => {
  beforeEach(() => {
    fakeWhatsappProvider = new FakeWhatsappProvider();
    fakeJsonDBProvider = new FakeJsonDBProvider();
    messageTemplate = new MessageTemplate();
    setDelay = new SetDelayService(
      fakeJsonDBProvider,
      messageTemplate,
      fakeWhatsappProvider,
    );
  });

  it('should be able to set delay', async () => {
    await setDelay.execute(20);

    const delay = await fakeJsonDBProvider.getDelay();

    expect(delay).toBe(20);
  });

  it('should not be able to set delay if a delay higher than 500 is given', async () => {
    await expect(setDelay.execute(510)).rejects.toBeInstanceOf(WaError);
  });

  it('should not be able to set delay if a delay lower than 10 is given', async () => {
    await expect(setDelay.execute(9)).rejects.toBeInstanceOf(WaError);
  });

  it('should not be able to set delay if a value different of number is given', async () => {
    await expect(
      setDelay.execute('invalidDelay' as unknown as number),
    ).rejects.toBeInstanceOf(WaError);
  });
});
