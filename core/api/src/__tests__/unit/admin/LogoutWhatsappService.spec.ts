import LogoutWhatsappService from '@modules/admin/services/LogoutWhatsappService';

import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';

let fakeWhatsappProvider: FakeWhatsappProvider;

let logoutWhatssapp: LogoutWhatsappService;

describe('LogoutWhatsapp', () => {
  beforeEach(() => {
    fakeWhatsappProvider = new FakeWhatsappProvider();
    logoutWhatssapp = new LogoutWhatsappService(fakeWhatsappProvider);
  });

  it('should be able to logout whatsapp', async () => {
    const logoutFunction = jest.spyOn(fakeWhatsappProvider, 'logout');

    await logoutWhatssapp.execute();

    expect(logoutFunction).toHaveBeenCalled();
  });
});
