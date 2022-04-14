import {Account} from "../Account";
import {FiatWallet} from "./FiatWallet";
import {CryptoWallet} from "./CryptoWallet";
import {CurrencyManager} from "../Managers/CurrencyManager";
import {Currency} from "../Currencies/Currency";
import {FiatCurrency} from "../Currencies/FiatCurrency";
import {Transaction} from "../Transaction/Transaction";
import {Holding} from "../Types";
import {Network} from "./Network";
import {CryptoCurrency} from "../Currencies/CryptoCurrency";
import {Order} from "../Transaction/Order";
import {Transfer} from "../Transaction/Transfer";
import {Wallet} from "./Wallet";

export class Portfolio {

  private account: Account;

  private fiatWallets: Map<number, FiatWallet>;

  private cryptoWallets: Map<number, CryptoWallet>;

  public constructor(account: Account) {
    this.account = account;
    this.fiatWallets = new Map<number, FiatWallet>();
    this.cryptoWallets = new Map<number, CryptoWallet>();
  }

  public addWallet(ticker: String) {
    let target: Currency = CurrencyManager.getInstance().getCurrency(ticker);
    if (target instanceof FiatCurrency) {
      this.fiatWallets.set(this.fiatWallets.size, new FiatWallet(target))
    } else if (target instanceof CryptoCurrency) {
      this.cryptoWallets.set(this.cryptoWallets.size, new CryptoWallet(target, new Network(target, "", "")))
    }
  }
  
  private getWallet(ticker : String) : Wallet{
    let wallet : Wallet;
    this.cryptoWallets.forEach((value) => {
      if (value.getCurrencyTicker() === ticker) {
        wallet = value;
      }
    });
    this.fiatWallets.forEach((value) => {
      if (value.getCurrencyTicker() === ticker) {
        wallet = value;
      }
    });
    if(wallet!)
    {
      return wallet;
    }
    this.addWallet(ticker);
    this.cryptoWallets.forEach((value) => {
      if (value.getCurrencyTicker() === ticker) {
        wallet = value;
      }
    });
    this.fiatWallets.forEach((value) => {
      if (value.getCurrencyTicker() === ticker) {
        wallet = value;
      }
    });
    if(wallet!)
    {
      return wallet;
    }
    else{
      throw "Invalid Arguments"
    }
  }

  public executeTransaction(t: Transaction): boolean {
    if (t instanceof Order) {
      let found: boolean = false;
      
      this.getWallet((t as Order).getPayCurrencyTicker()).executeTransaction(t);
      this.getWallet(t.getCurrencyTicker()).executeTransaction(t);
      
      return true;
    } else if (t instanceof Transfer) {
      this.getWallet(t.getCurrencyTicker()).executeTransaction(t);
      return true;
    } else {
      throw "Unsupported Operation";
    }
  }

  public receiveMoney(ticker: String, amount: number): void {
    this.getWallet(ticker).changeBalance(amount);
  }

  public getCryptoHoldings(): Holding[] {
    let count = this.cryptoWallets.size;
    let id = 0;
    let result: Holding[] = new Array(count);
    this.cryptoWallets.forEach((value) => {
      result[id] = value.getHolding(id)
      id += 1;
    })
    return result;
  }

  public getFiatHoldings(): Holding[] {
    let count = this.fiatWallets.size;
    let id = 0;
    let result: Holding[] = new Array(count);
    this.fiatWallets.forEach((value) => {
      result[id] = value.getHolding(id + 100)
      id += 1;
    })
    return result;
  }
}
