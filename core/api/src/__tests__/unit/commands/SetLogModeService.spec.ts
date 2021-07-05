import SetLogModeService from '@modules/commands/services/SetLogModeService';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import MessageTemplate from '@shared/utils/MessageTemplate/implementations/MessageTemplate';
import WaError from '@shared/errors/WaError';
import IGroupIDDTO from '@shared/container/providers/WhatsappProvider/dtos/IGroupIDDTO';

let setLogMode: SetLogModeService;

let fakeWhatsappProvider: FakeWhatsappProvider;
let fakeJsonDBProvider: FakeJsonDBProvider;
let messageTemplate: MessageTemplate;

describe('SetLogMode', () => {
  beforeEach(() => {
    messageTemplate = new MessageTemplate();
    fakeWhatsappProvider = new FakeWhatsappProvider();
    fakeJsonDBProvider = new FakeJsonDBProvider();
    setLogMode = new SetLogModeService(
      fakeJsonDBProvider,
      messageTemplate,
      fakeWhatsappProvider,
    );
  });

  it('should be able to set log mode', async () => {
    await fakeJsonDBProvider.setLogGroup('logGroup' as IGroupIDDTO);
    await setLogMode.execute('on');
    const logMode = await fakeJsonDBProvider.getLogMode();

    expect(logMode).toBe(true);
  });

  it('should not be able to set log mode if an invalid mode is given', async () => {
    await fakeJsonDBProvider.setLogGroup('logGroup' as IGroupIDDTO);
    await expect(setLogMode.execute('invalidMode')).rejects.toBeInstanceOf(
      WaError,
    );
  });

  it('should not be able to set log mode if no have logGroup', async () => {
    await expect(setLogMode.execute('on')).rejects.toBeInstanceOf(WaError);
  });
});
