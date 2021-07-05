import SetConfigsService from '@modules/admin/services/SetConfigsService';
import IConfigsDTO from '@shared/container/providers/JSONDBProvider/dtos/IConfigsDTO';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import IGroupIDDTO from '@shared/container/providers/WhatsappProvider/dtos/IGroupIDDTO';
import AppError from '@shared/errors/AppError';

let fakeJsonDBProvider: FakeJsonDBProvider;
let setConfigs: SetConfigsService;

describe('SetConfigs', () => {
  beforeEach(() => {
    fakeJsonDBProvider = new FakeJsonDBProvider();
    setConfigs = new SetConfigsService(fakeJsonDBProvider);
  });

  it('should be able to set configs', async () => {
    const setConfigsFunction = jest.spyOn(fakeJsonDBProvider, 'setConfigs');

    const configs = {
      groups: {
        targetGroupId: 'targetGroupId' as IGroupIDDTO,
        hostGroupId: 'hostGroupId' as IGroupIDDTO,
      },
      cloning: {
        cloningDelay: 20,
      },
      links: {
        linkMode: false,
      },
      logsConfigs: {
        logMode: false,
      },
      users: {
        masterUser: 5511964949542,
      },
    } as IConfigsDTO;

    await setConfigs.execute(configs);

    expect(setConfigsFunction).toHaveBeenLastCalledWith(configs);
  });

  it('should not be able to set configs if delay is invalid', async () => {
    const configs = {
      cloning: {
        cloningDelay: 181,
      },
    } as IConfigsDTO;

    await expect(setConfigs.execute(configs)).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to set configs if number of contacts do add per delay is invalid', async () => {
    const configs = {
      cloning: {
        cloningContactsToAddPerDelay: 40,
      },
    } as IConfigsDTO;

    await expect(setConfigs.execute(configs)).rejects.toBeInstanceOf(AppError);
  });
});
