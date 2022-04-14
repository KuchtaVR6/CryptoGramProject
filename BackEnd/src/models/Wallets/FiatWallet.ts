import {Wallet} from "./Wallet";
import {FiatCurrency} from "../Currencies/FiatCurrency";
import {Transaction} from "../Transaction/Transaction";

export class FiatWallet extends Wallet {
  
  public constructor(currency: FiatCurrency) {
    super(currency);
  }

  public getValueUSD(): number {
    return this.balance * this.currency.getRateUSD()
  }
}
