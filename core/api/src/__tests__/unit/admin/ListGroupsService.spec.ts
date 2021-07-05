import ListGroupsService from '@modules/admin/services/ListGroupsService';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import AppError from '@shared/errors/AppError';

let fakeWhatsappProvider: FakeWhatsappProvider;

let listGroups: ListGroupsService;

describe('ListGroups', () => {
  beforeEach(() => {
    fakeWhatsappProvider = new FakeWhatsappProvider();
    listGroups = new ListGroupsService(fakeWhatsappProvider);
  });

  it('should be able to get all groups', async () => {
    const allGroups = await listGroups.execute();

    expect(allGroups).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
        }),
      ]),
    );
  });

  it('should be able to get groups iam admin', async () => {
    const groupsIamAdmin = await listGroups.execute(true);

    expect(groupsIamAdmin).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
        }),
      ]),
    );
  });

  it('should not be able to get iam admin groups if no admin groups has been found', async () => {
    jest
      .spyOn(fakeWhatsappProvider, 'groupsIamAdmin')
      .mockImplementationOnce(async () => {
        return undefined;
      });

    await expect(listGroups.execute(true)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to remove groups from the array if it has no title', async () => {
    jest
      .spyOn(fakeWhatsappProvider, 'getGroupInfo')
      .mockImplementation(async () => {
        return {
          id: 'id',
        };
      });

    const allGroups = await listGroups.execute();
    const groupsIamAdmin = await listGroups.execute(true);

    expect(allGroups).toEqual([]);
    expect(groupsIamAdmin).toEqual([]);
  });
});
