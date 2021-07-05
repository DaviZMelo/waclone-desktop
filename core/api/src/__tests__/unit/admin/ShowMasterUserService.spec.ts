import ShowMasterUserService from '@modules/admin/services/ShowMasterUserService';

import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';

let fakeJsonDBProvider: FakeJsonDBProvider;

let showMasterUser: ShowMasterUserService;

describe('GetMasterUser', () => {
  beforeEach(() => {
    fakeJsonDBProvider = new FakeJsonDBProvider();
    showMasterUser = new ShowMasterUserService(fakeJsonDBProvider);
  });

  it('should be able to get master user', async () => {
    await fakeJsonDBProvider.setMasterUser(5511964945942);
    const masterUser = await showMasterUser.execute();

    expect(masterUser).toBe(5511964945942);
  });
});
