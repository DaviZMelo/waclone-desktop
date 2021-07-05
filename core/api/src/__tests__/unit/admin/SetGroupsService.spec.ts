import SetGroupsService from '@modules/admin/services/SetGroupsService';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import IGroupIDDTO from '@shared/container/providers/WhatsappProvider/dtos/IGroupIDDTO';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import AppError from '@shared/errors/AppError';

let fakeJsonDBProvider: FakeJsonDBProvider;
let fakeWhatsappProvider: FakeWhatsappProvider;
let setGroups: SetGroupsService;

describe('SetGroups', () => {
  beforeEach(() => {
    fakeWhatsappProvider = new FakeWhatsappProvider();
    fakeJsonDBProvider = new FakeJsonDBProvider();
    setGroups = new SetGroupsService(fakeWhatsappProvider, fakeJsonDBProvider);
  });

  it('should be able to set groups', async () => {
    const setGroupsResponse = await setGroups.execute({
      targetGroupId: 'targetGroupId123' as IGroupIDDTO,
      hostGroupId: 'hostGroupId123' as IGroupIDDTO,
    });

    expect(setGroupsResponse).toEqual({
      targetGroupId: 'targetGroupId123',
      hostGroupId: 'hostGroupId123',
    });
  });

  it('should be able to get targetGroupId by targetGroupLink', async () => {
    const setGroupsResponse = await setGroups.execute({
      hostGroupId: 'hostGroupId' as IGroupIDDTO,
      targetGroupLink: 'targetGroupLink',
    });

    expect(setGroupsResponse).toEqual({
      hostGroupId: 'hostGroupId',
      targetGroupId: 'targetGroupLink',
    });
  });

  it('should not be able to set groups if any of required values are empty', async () => {
    const setGroupsResponse1 = setGroups.execute({
      hostGroupId: undefined,
      targetGroupId: 'targetGroupId123' as IGroupIDDTO,
    });
    const setGroupsResponse2 = setGroups.execute({
      hostGroupId: 'hostGroupId123' as IGroupIDDTO,
    });

    await expect(setGroupsResponse1).rejects.toBeInstanceOf(AppError);
    await expect(setGroupsResponse2).rejects.toBeInstanceOf(AppError);
  });

  it('should return an error if joinGroupViaLink function returns 401', async () => {
    jest
      .spyOn(fakeWhatsappProvider, 'joinGroupViaLink')
      .mockImplementation(async () => {
        return 401;
      });

    await expect(
      setGroups.execute({
        hostGroupId: 'hostGroupId' as IGroupIDDTO,
        targetGroupLink: 'targetGroupLink',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return an error if joinGroupViaLink function returns a any value other than groupId', async () => {
    jest
      .spyOn(fakeWhatsappProvider, 'joinGroupViaLink')
      .mockImplementation(async () => {
        return undefined;
      });

    await expect(
      setGroups.execute({
        hostGroupId: 'hostGroupId' as IGroupIDDTO,
        targetGroupLink: 'targetGroupLink',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
