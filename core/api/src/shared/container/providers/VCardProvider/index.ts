import { container } from 'tsyringe';
import VCardProvider from './implementations/VCardProvider';
import IVCardProvider from './models/IVCardProvider';

container.registerSingleton<IVCardProvider>('VCardProvider', VCardProvider);
