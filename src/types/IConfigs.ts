export default interface IConfigs {
  users?: {
    masterUser: number;
    allowedUsers: Array<number>;
  };
  groups?: {
    targetGroupId: string;
    hostGroupId: string;
    targetGroupLink?: string;
  };
  links?: {
    linkMode: boolean;
    linkMessage?: string;
  };
  cloning?: {
    cloningDelay: number;
    cloningContactsToAddPerDelay: number;
    cloningContacts: Array<string>;
  };
  logsConfigs?: {
    logGroupId?: string;
    logMode: boolean;
  };
  logs?: Array<string>;
}
