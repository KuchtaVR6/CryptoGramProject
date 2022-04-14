import {FiatTransaction} from "./FiatTransaction";
import {CreditCard} from "../CreditCard";
import {Account} from "../Account";

export class Deposit extends FiatTransaction {

  private readonly card: CreditCard;

  public getCard(): CreditCard {
    return this.card;
  }

  public constructor (parentAccount: Account, ticker: String, time : Date, a: number, card: CreditCard) {
    super(parentAccount,ticker,a,time);
    this.card = card;
  }
}
