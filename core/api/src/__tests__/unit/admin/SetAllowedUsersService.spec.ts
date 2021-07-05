import SetAllowedUsersService from '@modules/admin/services/SetAllowedUsersService';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import AppError from '@shared/errors/AppError';

let fakeJsonDBProvider: FakeJsonDBProvider;
let setAllowedUsers: SetAllowedUsersService;

describe('SetAllowedUsers', () => {
  beforeEach(() => {
    fakeJsonDBProvider = new FakeJsonDBProvider();
    setAllowedUsers = new SetAllowedUsersService(fakeJsonDBProvider);
  });

  it('should be able to set allowed users', async () => {
    const setAllowedUsersResponse = await setAllowedUsers.execute([
      5511964945942,
    ]);

    expect(setAllowedUsersResponse).toEqual([5511964945942]);
  });

  it('should not be able to set allowed users if max allowed users limit has been reached', async () => {
    await expect(
      setAllowedUsers.execute([5511964945942, 5511964945943, 5511964945944]),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to set allowed users if they have duplicate numbers', async () => {
    await expect(
      setAllowedUsers.execute([5511964945942, 5511964945942]),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to set allowed users if they have any invalid number', async () => {
    await expect(setAllowedUsers.execute([5511964942])).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
