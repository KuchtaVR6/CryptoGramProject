import {CurrencyManager} from "../Managers/CurrencyManager";

export class Currency {

  private name: String;

  private ticker: String;

  private rateUSD: number;
  
  private readonly id : number;

  public constructor(id : number, name : String, ticker : String, rateUSD: number) {
    this.id = id;
    this.name = name;
    this.ticker = ticker;
    this.rateUSD = rateUSD;
  }

  public getRateUSD(): number {
    return this.rateUSD;
  }

  public setRateUSD(newRateUSD : number): void {
    this.rateUSD = newRateUSD;
  }

  public getName(): String {
    return this.name;
  }

  public setName(name: String) {
    this.name = name;
  }

  public getTicker(): String {
    return this.ticker;
  }

  public setTicker(ticker: String) {
    this.ticker = ticker;
  }
  
  public getID(){
    return this.id
  }
}
