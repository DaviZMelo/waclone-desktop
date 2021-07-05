import { container } from 'tsyringe';
import LowDBProvider from './implementations/LowDBProvider';
import IJSONDBProvider from './models/IJSONDBProvider';

container.registerSingleton<IJSONDBProvider>('JSONDBProvider', LowDBProvider);
