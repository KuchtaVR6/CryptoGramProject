import {MultiUserTransaction} from './MultiUserTransaction';
import {Account} from "../Account";
import {orderReport} from "../Types";
import {Transaction} from "./Transaction";

export class Transfer extends MultiUserTransaction {

  private readonly amountDue: number;
  
  public constructor(parentAccount: Account, ticker: String, a: number, timestamp : Date, receiver: Account, amountDue : number) {
    super(parentAccount, ticker, a, timestamp, receiver);
    this.amountDue = amountDue;
  }

  public getAmountDue(): number {
    return this.amountDue;
  }

  public getReport(id : number, host : Account) : orderReport {
    if(this.receivingAccount === host) {
      return {
        "id": id,
        "time": this.timestamp.getFullYear() + "/" + this.fixZeros(this.timestamp.getMonth()+1) + "/" + this.fixZeros(this.timestamp.getDate()) + " " + this.fixZeros(this.timestamp.getHours()) + ":" + this.fixZeros(this.timestamp.getMinutes()),
        "pair": this.currency.getTicker(),
        "type": "RECEIVED",
        "addiType" : "name",
        "additional": this.accountInvolved.getOwner().getFirstName() + " " + this.accountInvolved.getOwner().getSurName(),
        "from_amount": 0,
        "to_amount": this.amount
      };
    }
    else{
      return {
        "id": id,
        "time": this.timestamp.getFullYear() + "/" + this.fixZeros(this.timestamp.getMonth()+1) + "/" + this.fixZeros(this.timestamp.getDate()) + " " + this.fixZeros(this.timestamp.getHours()) + ":" + this.fixZeros(this.timestamp.getMinutes()),
        "pair": this.currency.getTicker(),
        "type": "SENT",
        "addiType" : "name",
        "additional": this.receivingAccount.getOwner().getFirstName() + " " + this.receivingAccount.getOwner().getSurName(),
        "from_amount": this.amount,
        "to_amount": 0
      };
    }
  }
}
