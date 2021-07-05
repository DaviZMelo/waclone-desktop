import { container } from 'tsyringe';
import MessageTemplate from './implementations/MessageTemplate';

container.registerSingleton('MessageTemplate', MessageTemplate);
