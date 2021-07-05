import IJSONDBProvider from '@shared/container/providers/JSONDBProvider/models/IJSONDBProvider';
import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import { inject, injectable } from 'tsyringe';
import IJobsProvider from '@shared/container/providers/JobsProvider/models/IJobsProvider';
import AppError from '@shared/errors/AppError';

@injectable()
export default class StopCloningService {
  constructor(
    @inject('JSONDBProvider')
    private jsonDBProvider: IJSONDBProvider,

    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,

    @inject('JobsProvider')
    private jobsProvider: IJobsProvider,
  ) {}

  public async execute() {
    const jobs = await this.jobsProvider.getJobs();

    if (jobs.length === 0) {
      throw new AppError('There is no group cloning running', 409);
    }

    await this.jobsProvider.cancelAllJobs();
  }
}
