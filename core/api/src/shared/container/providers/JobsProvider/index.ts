import { container } from 'tsyringe';
import NodeScheduleProvider from './implementations/NodeScheduleProvider';
import IJobsProvider from './models/IJobsProvider';

container.registerSingleton<IJobsProvider>(
  'JobsProvider',
  NodeScheduleProvider,
);
