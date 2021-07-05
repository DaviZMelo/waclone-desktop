import IGroupIDDTO from '../../WhatsappProvider/dtos/IGroupIDDTO';

export default interface ILogsConfigDTO {
  logGroupId?: IGroupIDDTO;
  logMode: boolean;
}
