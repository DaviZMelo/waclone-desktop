import schedule from 'node-schedule';
import IJobsProvider from '../models/IJobsProvider';

export default class NodeScheduleProvider implements IJobsProvider {
  public async scheduleJob(
    date: Date | number,
    callback: CallableFunction,
  ): Promise<Date> {
    schedule.scheduleJob(`job${date.toString()}`, date, callback());
    return new Date(Date.now());
  }

  public async getJobs(): Promise<Array<string>> {
    const jobs = Object.values(schedule.scheduledJobs).map(job => job.name);

    return jobs;
  }

  public cancelJob(jobName: string) {
    schedule.cancelJob(jobName);
  }

  public async cancelAllJobs(): Promise<void> {
    Object.values(schedule.scheduledJobs).map(job => schedule.cancelJob(job));
  }
}
