import ShowLinkModeService from '@modules/admin/services/ShowLinkModeService';

import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';

let fakeJsonDBProvider: FakeJsonDBProvider;

let showLinkMode: ShowLinkModeService;

describe('ShowLinkMode', () => {
  beforeEach(() => {
    fakeJsonDBProvider = new FakeJsonDBProvider();
    showLinkMode = new ShowLinkModeService(fakeJsonDBProvider);
  });

  it('should be able to get link mode', async () => {
    await fakeJsonDBProvider.setLinkMode(true);

    const linkMode = await showLinkMode.execute();

    expect(linkMode).toBe(true);
  });
});
