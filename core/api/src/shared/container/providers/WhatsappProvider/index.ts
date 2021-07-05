import { container } from 'tsyringe';
import WaAutomateProvider from './implementations/WaAutomateProvider';
import IWhatsappProvider from './models/IWhatsappProvider';

container.registerSingleton<IWhatsappProvider>(
  'WhatsappProvider',
  WaAutomateProvider,
);
