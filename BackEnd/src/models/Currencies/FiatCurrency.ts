import {Currency} from "./Currency";
import {Transaction} from "../Transaction/Transaction";

export class FiatCurrency extends Currency {
  
  private sign : String;

  public constructor(id : number, name : String, ticker : String, rateUSD: number, sign : String) {
    super(id, name, ticker, rateUSD)
    this.sign = sign;
  }

  public executeTransaction(t: Transaction): boolean {
    //  TODO - implement FiatCurrency.executeTransaction
    return false;
  }
  
  public getSign() : String{
    return this.sign;
  }
}
