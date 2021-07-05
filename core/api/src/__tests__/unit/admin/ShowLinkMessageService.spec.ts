import ShowLinkMessageService from '@modules/admin/services/ShowLinkMessageService';

import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';

let fakeJsonDBProvider: FakeJsonDBProvider;

let showLinkMessage: ShowLinkMessageService;

describe('ShowLinkMessage', () => {
  beforeEach(() => {
    fakeJsonDBProvider = new FakeJsonDBProvider();
    showLinkMessage = new ShowLinkMessageService(fakeJsonDBProvider);
  });

  it('should be able to get link message', async () => {
    await fakeJsonDBProvider.setLinkMessage('Fake Link Message');

    const linkMessage = await showLinkMessage.execute();

    expect(linkMessage).toBe('Fake Link Message');
  });
});
