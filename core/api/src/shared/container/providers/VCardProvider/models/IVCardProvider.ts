import IVCardPropsDTO from '../dtos/VCardPropsDTO';

export default interface IVCardProvider {
  create(cardProps: Array<IVCardPropsDTO>): string;
}
