import {Transaction} from "./Transaction";
import {Account} from "../Account";
import {transactionNotification} from "../Types";
import {CurrencyManager} from "../Managers/CurrencyManager";

export class MultiUserTransaction extends Transaction {
  protected receivingAccount: Account;

  public constructor (parentAccount: Account, ticker: String, a: number, timestamp : Date, receiver: Account) {
    super(parentAccount, ticker, a, timestamp);
    this.receivingAccount = receiver;
  }
  
  public getReceiver() : Account {
    return this.receivingAccount;
  }

  protected fixZeros(num : number) : String{
    let x = num.toString()
    if(x.length < 2)
    {
      return "0" + x
    }
    return x
  }

  public createNotification() : transactionNotification{
    return {
      "amount": this.amount,
      "currency": {
        "id" : this.currency.getID(),
        "name" : this.currency.getName(),
        "ticker": this.currency.getTicker(),
        "valueInUSD": CurrencyManager.getInstance().findRate(this.currency.getTicker())
      },
      "date": this.timestamp.getFullYear()+"/"+this.fixZeros(this.timestamp.getMonth()+1)+"/"+this.fixZeros(this.timestamp.getDate()),
      "recipient": {
        "id": this.accountInvolved.getOwner().getID(),
        "name": this.accountInvolved.getOwner().getFirstName() + " " +  this.accountInvolved.getOwner().getSurName(),
        "username" : this.accountInvolved.getOwner().getUsername()
      },
      "time": this.fixZeros(this.timestamp.getHours())+":"+this.fixZeros(this.timestamp.getMinutes()),
      "type": "send"
    }
  }
}
