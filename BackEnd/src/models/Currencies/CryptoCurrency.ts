import {Network} from "../Wallets/Network";
import {Currency} from "./Currency";
import fetch from 'isomorphic-unfetch';

export class CryptoCurrency extends Currency {

  private networks : Map<number, Network>;

  private coingeckoID : String;

  /**
  private lastAccessed : Date;
  private readonly rateUSDtimeDelay : number = 10000; // (10 secs) in milliseconds (1 seconds = 1000 milliseconds)
  */

  public constructor(id : number, name : String, ticker : String, rateUSD : number, networks : Map<number, Network>, coingeckoID: String) {
    super(id, name, ticker, rateUSD);
    this.networks = networks;
    this.coingeckoID = coingeckoID;
    //this.lastAccessed = new Date();
  }

  public getCoingeckoID() : String {
    return this.coingeckoID;
  }

  /**
  public getRateUSD(): number {
      if (Date.now() - this.lastAccessed.getTime() >= this.rateUSDtimeDelay){
        this.updateRateUSD();
        return super.getRateUSD();
      } else {
        return super.getRateUSD();
      }
  }
  */
  
  /**
   * Update crypto prices using Coingecko API
   * Note: the API is limited to 50 calls a minute
   * @returns {Boolean} indicates if successful
   */
   public async updateRateUSD(): Promise<Boolean>{
     try {
      const url = 'https://api.coingecko.com/api/v3/simple/price?ids='+this.coingeckoID+'&vs_currencies=usd'
      var output = JSON.parse("{}");
      await fetch(url)
      .then(response => response.json())
      .then(data => output = data)
      .catch(error => console.log("The following error accrued when fetching prices from Coingecko: "+error));
      
      //console.log("The coingeckoID is: "+this.coingeckoID)
      //console.log(output)
      const newRateUSD = output[this.coingeckoID.valueOf()]["usd"]
      //console.log(newRateUSD)
      this.setRateUSD(newRateUSD);
      return true;
     } catch (error) {
      console.log("The following error accured when fetching price of a crypto currency: "+error)
      return false;
     }
  }
}
//comments
