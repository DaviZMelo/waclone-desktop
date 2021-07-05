export default interface IJobsProvider {
  scheduleJob(
    date: Date | string | number,
    callback: CallableFunction,
  ): Promise<Date>;
  getJobs(): Promise<Array<string>>;
  cancelJob(jobName: string): void;
  cancelAllJobs(): Promise<void>;
}
