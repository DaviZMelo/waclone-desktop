import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import { inject, injectable } from 'tsyringe';
import LogError from '@shared/errors/LogError';
import IJobsProvider from '@shared/container/providers/JobsProvider/models/IJobsProvider';
import AppError from '@shared/errors/AppError';

@injectable()
export default class StartCloningService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,

    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,

    @inject('JobsProvider')
    private jobsProvider: IJobsProvider,
  ) {}

  public async execute() {
    const { cloning, groups, links } = await this.jsonDBProvider.getConfigs();

    if (
      (links.linkMode && !links.linkMessage) ||
      !cloning.cloningContactsToAddPerDelay ||
      !cloning.cloningContacts ||
      !cloning.cloningDelay ||
      !groups.targetGroupId ||
      !groups.hostGroupId
    ) {
      throw new AppError('The settings have not yet been set.', 404);
    }

    const date = new Date(Date.now());

    const parsedContacts = new Array(
      Math.ceil(
        cloning.cloningContacts.length / cloning.cloningContactsToAddPerDelay,
      ),
    )
      .fill(null)
      .map(_ =>
        cloning.cloningContacts.splice(0, cloning.cloningContactsToAddPerDelay),
      );

    date.setSeconds(date.getSeconds() + 20);
    date.setMinutes(date.getMinutes());

    await Promise.all(
      parsedContacts.map(async (contactsPart, index) => {
        const calculatedDelay = cloning.cloningDelay * index;
        date.setSeconds(date.getSeconds() + calculatedDelay);
        if (links.linkMode) {
          const hostGroupLink = await this.whatsappProvider.getGroupInviteLink(
            groups.hostGroupId,
          );

          await this.jobsProvider.scheduleJob(
            `${date.getSeconds()} ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${
              date.getMonth() + 1
            } ${date.getDay()}`,
            async () => {
              await Promise.all(
                contactsPart.map(async contact => {
                  await this.whatsappProvider
                    .sendText(contact, `${links.linkMessage} ${hostGroupLink}`)
                    .catch(() => {
                      const replacedContact = contact.replace('@c.us', '');

                      throw new LogError(
                        `Não foi possível adicionar o(s) número(s) ${replacedContact.toString()} ao grupo, verifique se eu tenho administrador, se o membro está com adição de grupos desativadas ou se ele me bloqueou.`,
                      );
                    });
                }),
              );
            },
          );
          return true;
        }

        await this.jobsProvider.scheduleJob(
          `${date.getSeconds()} ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${
            date.getMonth() + 1
          } ${date.getDay()}`,
          async () => {
            await this.whatsappProvider
              .addParticipant(groups.hostGroupId, contactsPart)
              .catch(() => {
                const replacedContacts = contactsPart.map(contact => {
                  return contact.replace('@c.us', '');
                });

                throw new LogError(
                  `Não foi possível adicionar o(s) número(s) ${replacedContacts.toString()} ao grupo, verifique se eu tenho administrador, se o membro está com adição de grupos desativadas ou se ele me bloqueou.`,
                );
              });
          },
        );
        return true;
      }),
    );
  }
}
