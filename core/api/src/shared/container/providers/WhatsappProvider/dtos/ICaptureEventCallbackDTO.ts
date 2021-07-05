export default interface ICaptureEventFunction {
  (type: string, data: any): void;
}
