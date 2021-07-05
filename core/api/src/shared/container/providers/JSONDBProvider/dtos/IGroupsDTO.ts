import IGroupIDDTO from '../../WhatsappProvider/dtos/IGroupIDDTO';

export default interface IGroupsDTO {
  targetGroupId: IGroupIDDTO;
  hostGroupId: IGroupIDDTO;
  targetGroupLink?: string;
}
