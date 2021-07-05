import SetLinkMessageService from '@modules/admin/services/SetLinkMessageService';

import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import AppError from '@shared/errors/AppError';

let fakeJsonDBProvider: FakeJsonDBProvider;

let setLinkMessage: SetLinkMessageService;

describe('SetLinkMessage', () => {
  beforeEach(() => {
    fakeJsonDBProvider = new FakeJsonDBProvider();
    setLinkMessage = new SetLinkMessageService(fakeJsonDBProvider);
  });

  it('should be able to set link message', async () => {
    const setLinkMessageResponse = await setLinkMessage.execute(
      'fakeLinkMessage',
    );

    expect(setLinkMessageResponse).toBe('fakeLinkMessage');
  });

  it('should not be able to set the link message if the message length exceeds 63536', async () => {
    await expect(
      setLinkMessage.execute('fakeLinkMessage'.repeat(63536)),
    ).rejects.toBeInstanceOf(AppError);
  });
});
