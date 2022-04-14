import {CryptoCurrency} from "../Currencies/CryptoCurrency";
import {Transaction} from "../Transaction/Transaction";

export class Network {
  
  private currency: CryptoCurrency;

  private publicKey: String;

  private privateKey: String;
  
  public constructor(currency : CryptoCurrency, publicKey : String, privateKey : String) {
    this.currency = currency;
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  public executeTransaction(t: Transaction) {
    //  TODO - implement Network.executeTransaction
    return false;
  }
}
