import {Account} from "./Account";

export class CreditCard {

  private account: Account;

  private readonly cardNumber: String;

  private readonly cvv: String;

  private readonly expiry: Date;

  private readonly firstName: String;

  private readonly lastName: String;

  public constructor (account : Account, firstName: String, lastName: String, cvv: String, expiry: Date, cardNumber: String) {
    this.account = account;
    this.firstName = firstName;
    this.lastName = lastName;
    this.cvv = cvv;
    this.expiry = expiry;
    this.cardNumber = cardNumber;
  }

  public getCardNumber(): String {
    return this.cardNumber;
  }

  public getCCV(): String {
    return this.cvv;
  }

  public getExpiry(): Date {
    return this.expiry;
  }

  public getFirstName(): String {
    return this.firstName;
  }

  public getLastName(): String {
    return this.lastName;
  }
}
