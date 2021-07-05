import IJobsProvider from '../models/IJobsProvider';

export default class FakeJobsProvider implements IJobsProvider {
  private jobs: Array<string> = [];

  public async scheduleJob(
    date: Date | string | number,
    callback: CallableFunction,
  ): Promise<Date> {
    const jobName = `job${date.toString()}`;
    this.jobs.push(jobName);
    await callback();

    return new Date(date);
  }

  public async getJobs(): Promise<Array<string>> {
    return this.jobs;
  }

  public cancelJob(jobName: string) {
    const filteredjobs = this.jobs.filter(job => job !== jobName);

    this.jobs = filteredjobs;
  }

  public async cancelAllJobs(): Promise<void> {
    this.jobs = [];
  }
}
