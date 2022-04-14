import {Account} from "../Account";
import {Currency} from "../Currencies/Currency";
import {CurrencyManager} from "../Managers/CurrencyManager";
import {orderReport} from "../Types";

export class Transaction {

  protected accountInvolved: Account;

  protected currency: Currency;

  protected amount: number;

  private isCancelled: boolean;
  
  private executed : boolean;

  protected readonly timestamp: Date;

  public constructor (parentAccount: Account, ticker: String, a: number, timestamp : Date) {
    this.accountInvolved = parentAccount;
    this.currency = CurrencyManager.getInstance().getCurrency(ticker);
    this.amount = a;
    this.isCancelled = false;
    this.timestamp = timestamp;
    this.executed = false;
  }

  public cancel() {
    this.isCancelled = true;
  }
  
  public getCurrencyTicker () : String{
    return this.currency.getTicker()
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }
  
  public isExecuted() : boolean{
    return this.executed
  }
  
  public confirmExecuted() {
    this.executed = true;
  }
  
  public getAmount() : number {
    return this.amount;
  }
}
