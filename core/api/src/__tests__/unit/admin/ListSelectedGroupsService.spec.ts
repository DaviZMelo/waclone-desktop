import ListSelectedGroupsService from '@modules/admin/services/ListSelectedGroupsService';

import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import IGroupIDDTO from '@shared/container/providers/WhatsappProvider/dtos/IGroupIDDTO';

let fakeJsonDBProvider: FakeJsonDBProvider;

let listSelectedGroups: ListSelectedGroupsService;

describe('ListSelectedGroups', () => {
  beforeEach(() => {
    fakeJsonDBProvider = new FakeJsonDBProvider();
    listSelectedGroups = new ListSelectedGroupsService(fakeJsonDBProvider);
  });

  it('should be able to get selected groups service', async () => {
    await fakeJsonDBProvider.setTargetGroupId('targetGroupId' as IGroupIDDTO);
    await fakeJsonDBProvider.setHostGroupId('hostGroupId' as IGroupIDDTO);

    const selectedGroups = await listSelectedGroups.execute();

    expect(selectedGroups).toEqual({
      targetGroupId: 'targetGroupId',
      hostGroupId: 'hostGroupId',
    });
  });
});
