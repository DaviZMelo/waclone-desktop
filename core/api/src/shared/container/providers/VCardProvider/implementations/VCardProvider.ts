import IVCardPropsDTO from '../dtos/VCardPropsDTO';
import IVCardProvider from '../models/IVCardProvider';

export default class VCardProvider implements IVCardProvider {
  public create(cardProps: Array<IVCardPropsDTO>): string {
    let cards: string;
    cardProps.map(card => {
      const { nickname, firstname, tel } = card;

      const parsedTel = tel
        .replace('+', '')
        .replace(/-/g, '')
        .replace(' ', '')
        .replace(' ', '');

      let vCard: string;

      if (!cards) {
        cards = `BEGIN:VCARD
VERSION:3.0
N:;${nickname};;;
FN:${firstname}
TEL;type=CELL;waid=${parsedTel}:${tel}
END:VCARD`;
      } else {
        vCard = `
BEGIN:VCARD
VERSION:3.0
N:;${nickname};;;
FN:${firstname}
TEL;type=CELL;waid=${parsedTel}:${tel}
END:VCARD`;

        cards = `${cards}${vCard}`.replace(' ', '');
      }

      return vCard;
    });

    return cards;
  }
}
