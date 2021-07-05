import ListAllowedUsersService from '@modules/admin/services/ListAllowedUsersService';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';

let fakeJsonDBProvider: FakeJsonDBProvider;
let listAllowedUsers: ListAllowedUsersService;

describe('ListAllowedUsers', () => {
  beforeEach(() => {
    fakeJsonDBProvider = new FakeJsonDBProvider();
    listAllowedUsers = new ListAllowedUsersService(fakeJsonDBProvider);
  });

  it('should be able to get allowed users', async () => {
    const newAllowedUsers = await fakeJsonDBProvider.setAllowedUsers([
      5511964945942,
    ]);

    const allowedUsers = await listAllowedUsers.execute();

    expect(allowedUsers).toEqual(newAllowedUsers);
  });
});
