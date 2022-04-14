import {Wallet} from "./Wallet";
import {Network} from "./Network";
import {CryptoCurrency} from "../Currencies/CryptoCurrency";
import {Transaction} from "../Transaction/Transaction";

export class CryptoWallet extends Wallet {

  private network: Network;

  public constructor(currency: CryptoCurrency, network : Network) {
    super(currency);
    this.network = network;
  }

  public getValueUSD(): number {
    return this.balance * this.currency.getRateUSD()
  }
}
