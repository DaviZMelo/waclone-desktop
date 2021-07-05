import WaError from '@shared/errors/WaError';
import IMessageTemplate from '@shared/utils/MessageTemplate/models/IMessageTemplate';
import { inject, injectable } from 'tsyringe';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import IJobsProvider from '@shared/container/providers/JobsProvider/models/IJobsProvider';

@injectable()
export default class DisableTaskService {
  constructor(
    @inject('MessageTemplate')
    private messageTemplate: IMessageTemplate,

    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,

    @inject('JobsProvider')
    private jobsProvider: IJobsProvider,
  ) {}

  public async execute(): Promise<void> {
    const jobList = await this.jobsProvider.getJobs();

    if (jobList.length === 0) {
      throw new WaError(
        this.messageTemplate.errorMessage(
          'Não há nenhuma ação sendo executada no momento.',
        ),
      );
    }

    await this.jobsProvider.cancelAllJobs();

    await this.whatsappProvider.reply(
      this.whatsappProvider.message.from,
      this.messageTemplate.successMessage('Todas as ações foram canceladas.'),
      this.whatsappProvider.message.id,
    );
  }
}
