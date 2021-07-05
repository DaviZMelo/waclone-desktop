import SetLinkModeService from '@modules/admin/services/SetLinkModeService';

import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';

let fakeJsonDBProvider: FakeJsonDBProvider;

let setLinkMode: SetLinkModeService;

describe('SetLinkMode', () => {
  beforeEach(() => {
    fakeJsonDBProvider = new FakeJsonDBProvider();
    setLinkMode = new SetLinkModeService(fakeJsonDBProvider);
  });

  it('should be able to set link mode', async () => {
    const setLinkModeResponse = await setLinkMode.execute(true);

    expect(setLinkModeResponse).toBe(true);
  });
});
