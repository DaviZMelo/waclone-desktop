import IStorageProvider from '../models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(fileName: string, _data: string): Promise<void> {
    this.storage.push(fileName);
  }

  public async deleteFile(filename: string): Promise<void> {
    const foundIndex = this.storage.findIndex(
      storageFile => storageFile === filename,
    );

    this.storage.splice(foundIndex, 1);
  }
}
