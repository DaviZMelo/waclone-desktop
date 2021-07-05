import fs from 'fs';
import path from 'path';
import tempFileConfig from '@config/tempFile';
import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(fileName: string, data: string): Promise<void> {
    await fs.promises.writeFile(
      path.resolve(tempFileConfig.tempFileFolder, fileName),
      data,
    );
  }

  public async deleteFile(filename: string): Promise<void> {
    const filepath = path.resolve(tempFileConfig.tempFileFolder, filename);
    try {
      await fs.promises.stat(filepath);
    } catch {
      return;
    }

    await fs.promises.unlink(filepath);
  }
}
