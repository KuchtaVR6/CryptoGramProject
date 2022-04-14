import {Account} from "../Account";
import {FiatTransaction} from "./FiatTransaction";

export class Withdraw extends FiatTransaction {

  private accountNo: String;

  private sortCode: String;

  public constructor (parentAccount: Account, ticker: String, timestamp: Date, a: number, aNo: String, sCode: String) {
    super(parentAccount, ticker , a, timestamp);
    this.accountNo = aNo;
    this.sortCode = sCode;
  }

  public setAccountNo(accountNo: String) {
    this.accountNo = accountNo;
  }

  public setSortCode(sortCode: String) {
    this.sortCode = sortCode;
  }
}
