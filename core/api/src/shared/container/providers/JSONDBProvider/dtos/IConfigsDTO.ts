import ICloningDTO from './ICloningDTO';
import IGroupsDTO from './IGroupsDTO';
import ILinksDTO from './ILinksDTO';
import ILogsConfigDTO from './ILogsConfigDTO';
import ILogsDTO from './ILogsDTO';
import IUsersDTO from './IUsersDTO';

export default interface IConfigsDTO {
  users?: IUsersDTO;
  groups?: IGroupsDTO;
  links?: ILinksDTO;
  cloning?: ICloningDTO;
  logsConfigs?: ILogsConfigDTO;
  logs?: Array<ILogsDTO>;
}
