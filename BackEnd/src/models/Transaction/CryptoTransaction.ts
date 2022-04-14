import {SingleUserTransaction} from "./SingleUserTransdaction";
import {Account} from "../Account";

export class CryptoTransaction extends SingleUserTransaction {

  private newWalletAddress: String;

  private readonly type: String;

  public constructor (parentAccount: Account, ticker: String, a: number, timestamp : Date, add: String, type: String) {
    super(parentAccount, ticker, a, timestamp)
    this.type = type;
    this.newWalletAddress = add;
  }

  public getNewWalletAddress(): String {
    return this.newWalletAddress;
  }

  public setNewWalletAddress(newWalletAddress: String) {
    this.newWalletAddress = newWalletAddress;
  }

  public getType(): String {
    return this.type;
  }
}
