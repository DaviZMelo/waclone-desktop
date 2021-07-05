import ListLogsService from '@modules/admin/services/ListLogsService';

import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';

let fakeJsonDBProvider: FakeJsonDBProvider;

let listLogs: ListLogsService;

describe('GetLogs', () => {
  beforeEach(() => {
    fakeJsonDBProvider = new FakeJsonDBProvider();
    listLogs = new ListLogsService(fakeJsonDBProvider);
  });

  it('should be able to get logs', async () => {
    const fakeLog = [{ logMessage: 'Fake Log', logDate: '12/02/21 13:20' }];
    await fakeJsonDBProvider.setLogs(fakeLog);

    const logs = await listLogs.execute();

    expect(logs).toBe(fakeLog);
  });
});
