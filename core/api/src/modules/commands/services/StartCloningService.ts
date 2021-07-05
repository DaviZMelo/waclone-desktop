import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import IMessageTemplate from '@shared/utils/MessageTemplate/models/IMessageTemplate';
import WaError from '@shared/errors/WaError';
import LogError from '@shared/errors/LogError';
import { inject, injectable } from 'tsyringe';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import IJobsProvider from '@shared/container/providers/JobsProvider/models/IJobsProvider';

@injectable()
export default class EnableTaskService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,

    @inject('MessageTemplate')
    private messageTemplate: IMessageTemplate,

    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,

    @inject('JobsProvider')
    private jobsProvider: IJobsProvider,
  ) {}

  public async execute(): Promise<void> {
    const contacts = await this.jsonDBProvider.getContacts();

    const linkMessage = await this.jsonDBProvider.getLinkMessage();
    const databaseDelay = await this.jsonDBProvider.getDelay();
    const targetGroupId = await this.jsonDBProvider.getTargetGroupId();
    const hostGroupId = await this.jsonDBProvider.getHostGroupId();
    const linkMode = await this.jsonDBProvider.getLinkMode();

    const date = new Date(Date.now());

    if (!hostGroupId) {
      throw new WaError(
        this.messageTemplate.errorMessage(
          'Nenhum grupo anfitrião foi definido, use o comando +grupoanfitriao.',
        ),
      );
    }

    if (!contacts || !targetGroupId) {
      throw new WaError(
        this.messageTemplate.errorMessage(
          'Não foram encontrados contatos para serem adicionados, use o comando +grupoalvo (link).',
        ),
      );
    }

    if (!linkMode) {
      const iAmAdmin = await this.whatsappProvider.groupsIamAdmin();

      const checkIamAdmin = iAmAdmin.find(group => group === hostGroupId);

      if (!checkIamAdmin) {
        throw new WaError(
          this.messageTemplate.errorMessage(
            'É necessário me dar administrador no grupo anfitrião para que eu possa adicionar os membros.',
          ),
        );
      }

      await Promise.all(
        contacts.map(async (contact, index) => {
          const delay = databaseDelay * index;
          date.setSeconds(date.getSeconds() + delay);
          await this.jobsProvider.scheduleJob(
            `${date.getSeconds()} ${
              date.getMinutes() + 1
            } ${date.getHours()} ${date.getDate()} ${
              date.getMonth() + 1
            } ${date.getDay()}`,
            async () => {
              const replacedContact = contact.replace('@c.us', '');
              await this.whatsappProvider
                .addParticipant(targetGroupId, contact)
                .catch(() => {
                  throw new LogError(
                    `Não foi possível adicionar o número ${replacedContact} ao grupo, verifique se eu tenho administrador, se o membro está com adição de grupos desativadas ou se ele me bloqueou.`,
                  );
                });
            },
          );
        }),
      );

      await this.whatsappProvider.reply(
        this.whatsappProvider.message.from,
        this.messageTemplate.successMessage(
          `A cada ${databaseDelay} segundos serão adicionados novos membros no grupo definido como anfitrião`,
        ),
        this.whatsappProvider.message.id,
      );
    } else {
      const groupInviteLink = await this.whatsappProvider.getGroupInviteLink(
        hostGroupId,
      );

      await Promise.all(
        contacts.map(async (contact, index) => {
          const delay = databaseDelay * index;
          date.setSeconds(date.getSeconds() + delay);
          await this.jobsProvider.scheduleJob(
            `${date.getSeconds() + 10} ${
              date.getMinutes() + 1
            } ${date.getHours()} ${date.getDate()} ${
              date.getMonth() + 1
            } ${date.getDay()}`,
            async () => {
              const replacedContact = contact.replace('@c.us', '');
              await this.whatsappProvider
                .sendText(contact, linkMessage)
                .catch(() => {
                  throw new LogError(
                    `Não foi possível enviar a mensagem de link para o número ${replacedContact}`,
                  );
                });
              await this.whatsappProvider
                .sendText(contact, groupInviteLink)
                .catch(() => {
                  throw new LogError(
                    `Não foi possível enviar o link do grupo para o número ${replacedContact}`,
                  );
                });
            },
          );
        }),
      );

      await this.whatsappProvider.reply(
        this.whatsappProvider.message.from,
        this.messageTemplate.successMessage(
          `A cada ${databaseDelay} segundos será enviado o link do grupo anfitrião para os membros do grupo alvo`,
        ),
        this.whatsappProvider.message.id,
      );
    }
  }
}
