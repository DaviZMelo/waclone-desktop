import ListCommandsService from '@modules/commands/services/ListCommandsService';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';

let listCommands: ListCommandsService;

let fakeWhatsappProvider: FakeWhatsappProvider;

describe('ListCommands', () => {
  beforeEach(() => {
    fakeWhatsappProvider = new FakeWhatsappProvider();
    listCommands = new ListCommandsService(fakeWhatsappProvider);
  });

  it('should be able to set link message', async () => {
    const response = await listCommands.execute();

    expect(typeof response).toBe('string');
  });
});
