import StopCloningService from '@modules/admin/services/StopCloningService';

import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import FakeJobsProvider from '@shared/container/providers/JobsProvider/fakes/FakeJobsProvider';
import AppError from '@shared/errors/AppError';

let fakeJsonDBProvider: FakeJsonDBProvider;
let fakeWhatsappProvider: FakeWhatsappProvider;
let fakeJobsProvider: FakeJobsProvider;

let stopCloning: StopCloningService;

describe('StopCloning', () => {
  beforeEach(() => {
    fakeJsonDBProvider = new FakeJsonDBProvider();
    fakeWhatsappProvider = new FakeWhatsappProvider();
    fakeJobsProvider = new FakeJobsProvider();
    stopCloning = new StopCloningService(
      fakeJsonDBProvider,
      fakeWhatsappProvider,
      fakeJobsProvider,
    );
  });

  it('should be able to stop group cloning', async () => {
    await fakeJobsProvider.scheduleJob('fakeJob', () => true);

    const stopJobsFunction = jest.spyOn(fakeJobsProvider, 'cancelAllJobs');

    await stopCloning.execute();

    expect(stopJobsFunction).toHaveBeenCalledTimes(1);
  });

  it('should not be able to stop group cloning if there is no group cloning started', async () => {
    await expect(stopCloning.execute()).rejects.toBeInstanceOf(AppError);
  });
});
