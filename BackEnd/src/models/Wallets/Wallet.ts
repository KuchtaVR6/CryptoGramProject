import {Holding} from "../Types";
import {Currency} from "../Currencies/Currency";
import {Transaction} from "../Transaction/Transaction";
import {Transfer} from "../Transaction/Transfer";
import {Order} from "../Transaction/Order";
import {FiatCurrency} from "../Currencies/FiatCurrency";

export class Wallet {

  protected balance: number;

  protected currency: Currency;

  public constructor(currency: Currency) {
    this.balance = 0;
    this.currency = currency;
  }

  public getBalance(): number {
    return this.balance;
  }

  public getValueUSD(): number {
    throw "I'm abstract"
  }

  public changeBalance(delta: number) {
    if (+this.balance + +delta >= 0) {
      this.balance = Math.floor((+this.balance + Number(delta))*100)/100;
    } else {
      throw 'Insufficient funds';
    }
  }

  public changeBalanceNeg(delta: number) {
    if (+this.balance - +delta >= 0) {
      this.balance = Math.floor((+this.balance - +delta)*100)/100;
    } else {
      throw 'Insufficient funds';
    }
  }

  public getCurrencyTicker(): String {
    return this.currency.getTicker();
  }

  public getHolding(id: number): Holding {
    if(this.currency instanceof FiatCurrency) {
      return {
        id: id.toString(),
        ticker: this.currency.getTicker(),
        name: this.currency.getName(),
        amount: this.balance,
        sign: (this.currency as FiatCurrency).getSign()
      }
    }
    else{
      return {
        id: id.toString(),
        ticker: this.currency.getTicker(),
        name: this.currency.getName(),
        amount: this.balance,
        sign: ""
      }
    }
  }

  public executeTransaction(t: Transaction): boolean {
    if(t instanceof Transfer)
    {
      this.changeBalanceNeg(t.getAmount());
    }
    else if (t instanceof Order)
    {
      if((t as Order).getPayCurrencyTicker()===this.currency.getTicker())
      {
        this.changeBalanceNeg(t.getAmount())
      }
      else{
        this.changeBalance(t.getTotal())
      }
    }
    return true;
  }
}
