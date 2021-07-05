import IContactIDDTO from '../../WhatsappProvider/dtos/IContactIDDTO';

export default interface ICloningDTO {
  cloningDelay: number;
  cloningContactsToAddPerDelay: number;
  cloningContacts: Array<IContactIDDTO>;
}
