import StopCloningService from '@modules/commands/services/StopCloningService';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import FakeJobsProvider from '@shared/container/providers/JobsProvider/fakes/FakeJobsProvider';
import MessageTemplate from '@shared/utils/MessageTemplate/implementations/MessageTemplate';
import WaError from '@shared/errors/WaError';

let fakeWhatsappProvider: FakeWhatsappProvider;
let messageTemplate: MessageTemplate;
let stopCloning: StopCloningService;
let fakeJobsProvider: FakeJobsProvider;

describe('StopCloning', () => {
  beforeEach(() => {
    fakeJobsProvider = new FakeJobsProvider();
    messageTemplate = new MessageTemplate();
    fakeWhatsappProvider = new FakeWhatsappProvider();
    stopCloning = new StopCloningService(
      messageTemplate,
      fakeWhatsappProvider,
      fakeJobsProvider,
    );
  });

  it('should be able to disable the task service', async () => {
    await fakeJobsProvider.scheduleJob(new Date(), () => true);

    await stopCloning.execute();

    const activeJobs = await fakeJobsProvider.getJobs();
    expect(activeJobs).toEqual([]);
  });

  it('should not be able to disable the task service if there is no active jobs', async () => {
    await fakeJobsProvider.cancelAllJobs();
    await expect(stopCloning.execute()).rejects.toBeInstanceOf(WaError);
  });
});
