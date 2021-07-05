import SetMasterUserService from '@modules/admin/services/SetMasterUserService';

import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import AppError from '@shared/errors/AppError';

let fakeJsonDBProvider: FakeJsonDBProvider;

let setMasterUser: SetMasterUserService;

describe('SetMasterUser', () => {
  beforeEach(() => {
    fakeJsonDBProvider = new FakeJsonDBProvider();
    setMasterUser = new SetMasterUserService(fakeJsonDBProvider);
  });

  it('should be able to set master user', async () => {
    const fakeMasterUser = 55119649459452;

    await fakeJsonDBProvider.setAllowedUsers([fakeMasterUser]);
    const setMasterUserResponse = await setMasterUser.execute(fakeMasterUser);

    expect(setMasterUserResponse).toBe(fakeMasterUser);
  });

  it('should not be able to set master user if he is not yet an allowed user', async () => {
    await fakeJsonDBProvider.setAllowedUsers([5511964949543]);
    await expect(setMasterUser.execute(55119649459452)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
