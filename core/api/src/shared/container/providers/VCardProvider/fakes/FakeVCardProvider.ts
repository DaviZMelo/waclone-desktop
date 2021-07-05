import IVCardPropsDTO from '../dtos/VCardPropsDTO';
import IVCardProvider from '../models/IVCardProvider';

export default class VCardProvider implements IVCardProvider {
  public create(cardProps: Array<IVCardPropsDTO>): string {
    return cardProps.toString();
  }
}
