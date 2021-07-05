import StartCloningService from '@modules/commands/services/StartCloningService';
import FakeWhatsappProvider from '@shared/container/providers/WhatsappProvider/fakes/FakeWhatsappProvider';
import FakeJsonDBProvider from '@shared/container/providers/JSONDBProvider/fakes/FakeJSONDBProvider';
import FakeJobsProvider from '@shared/container/providers/JobsProvider/fakes/FakeJobsProvider';
import MessageTemplate from '@shared/utils/MessageTemplate/implementations/MessageTemplate';
import WaError from '@shared/errors/WaError';
import LogError from '@shared/errors/LogError';
import IGroupIDDTO from '@shared/container/providers/WhatsappProvider/dtos/IGroupIDDTO';
import IContactIDDTO from '@shared/container/providers/WhatsappProvider/dtos/IContactIDDTO';
import IConfigsDTO from '@shared/container/providers/JSONDBProvider/dtos/IConfigsDTO';

let fakeWhatsappProvider: FakeWhatsappProvider;
let messageTemplate: MessageTemplate;
let startCloning: StartCloningService;
let fakeJobsProvider: FakeJobsProvider;
let fakeJsonDBProvider: FakeJsonDBProvider;

describe('StartCloning', () => {
  beforeEach(async () => {
    fakeJobsProvider = new FakeJobsProvider();
    messageTemplate = new MessageTemplate();
    fakeWhatsappProvider = new FakeWhatsappProvider();
    fakeJsonDBProvider = new FakeJsonDBProvider();
    startCloning = new StartCloningService(
      fakeJsonDBProvider,
      messageTemplate,
      fakeWhatsappProvider,
      fakeJobsProvider,
    );

    await fakeJsonDBProvider.setConfigs({
      groups: {
        hostGroupId: 'hostGroupId' as IGroupIDDTO,
        targetGroupId: 'targetGroupId' as IGroupIDDTO,
      },
      cloning: {
        cloningDelay: 10,
        cloningContactsToAddPerDelay: 10,
        cloningContacts: ['contact', 'contact2' as IContactIDDTO],
      },
      links: {
        linkMessage: 'linkMessage',
        linkMode: false,
      },
      users: {
        masterUser: 55,
      },
    } as IConfigsDTO);
  });

  it('should be able to enable the task service', async () => {
    const addParticipantFunction = jest.spyOn(
      fakeWhatsappProvider,
      'addParticipant',
    );

    jest
      .spyOn(fakeWhatsappProvider, 'groupsIamAdmin')
      .mockImplementation(async () => {
        return ['hostGroupId' as IGroupIDDTO];
      });

    await startCloning.execute();

    expect(addParticipantFunction).toHaveBeenCalledTimes(2);
  });

  it('should not be able to enable the task service if there is no host group', async () => {
    await fakeJsonDBProvider.setHostGroupId(undefined);
    await expect(startCloning.execute()).rejects.toBeInstanceOf(WaError);
  });

  it('should not be able to enable the task service if there is no contacts', async () => {
    await fakeJsonDBProvider.setContacts(undefined);
    await expect(startCloning.execute()).rejects.toBeInstanceOf(WaError);
  });

  it('should not be able to enable the task service if there is no target group', async () => {
    await fakeJsonDBProvider.setTargetGroupId(undefined);
    await expect(startCloning.execute()).rejects.toBeInstanceOf(WaError);
  });

  it('should not be able to enable the task service if the bot is not an host group admin', async () => {
    fakeJsonDBProvider.setHostGroupId('groupWhereImNotAdmin' as IGroupIDDTO);

    await expect(startCloning.execute()).rejects.toBeInstanceOf(WaError);
  });

  it('should not be able to enable the task service if the bot is not an host group admin', async () => {
    fakeJsonDBProvider.setHostGroupId('groupWhereImNotAdmin' as IGroupIDDTO);

    await expect(startCloning.execute()).rejects.toBeInstanceOf(WaError);
  });

  it('should throw logError if it not possible to invite', async () => {
    jest
      .spyOn(fakeWhatsappProvider, 'groupsIamAdmin')
      .mockImplementation(async () => {
        return ['hostGroupId' as IGroupIDDTO];
      });

    jest
      .spyOn(fakeWhatsappProvider, 'addParticipant')
      .mockImplementation(async () => {
        throw new Error();
      });

    await expect(startCloning.execute()).rejects.toBeInstanceOf(LogError);
  });

  it('should throw logError if it not possible to send text', async () => {
    await fakeJsonDBProvider.setLinkMode(true);

    jest
      .spyOn(fakeWhatsappProvider, 'groupsIamAdmin')
      .mockImplementation(async () => {
        return ['hostGroupId' as IGroupIDDTO];
      });

    jest
      .spyOn(fakeWhatsappProvider, 'sendText')
      .mockImplementation(async () => {
        throw new Error();
      });

    await expect(startCloning.execute()).rejects.toBeInstanceOf(LogError);
  });

  it('should throw logError if it not possible to send link', async () => {
    await fakeJsonDBProvider.setLinkMode(true);

    jest
      .spyOn(fakeWhatsappProvider, 'groupsIamAdmin')
      .mockImplementation(async () => {
        return ['hostGroupId' as IGroupIDDTO];
      });

    const sendTextFunction = jest
      .spyOn(fakeWhatsappProvider, 'sendText')
      .mockImplementationOnce(async () => true)
      .mockImplementationOnce(async () => true)
      .mockImplementationOnce(async () => {
        throw new Error();
      });

    await expect(startCloning.execute()).rejects.toBeInstanceOf(LogError);
    expect(sendTextFunction).toHaveBeenCalledTimes(4);
  });
});
