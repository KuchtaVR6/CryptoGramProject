import {MultiUserTransaction} from "./MultiUserTransaction";
import {Transfer} from "./Transfer";
import {Account} from "../Account";
import {transactionNotification} from "../Types";
import {CurrencyManager} from "../Managers/CurrencyManager";

export class Request extends MultiUserTransaction {

  private isAccepted: boolean;
  
  public constructor(parentAccount: Account, ticker: String, a: number, timestamp : Date, receiver: Account) {
    super(parentAccount, ticker, a, timestamp, receiver);
    this.isAccepted = false;
  }

  public accept(): Transfer {
    this.isAccepted = true;
    return new Transfer(super.accountInvolved,super.currency.getTicker(),super.amount,super.timestamp,super.receivingAccount,super.amount)
  }

  public getStatus() : boolean{
    return this.isAccepted;
  }
}
