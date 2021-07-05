export default interface IStorageProvider {
  saveFile(fileName: string, data: string): Promise<void>;
  deleteFile(fileName: string): Promise<void>;
}
