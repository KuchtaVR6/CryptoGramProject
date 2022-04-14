import {Account} from "../Account";
import {SingleUserTransaction} from "./SingleUserTransdaction";
import {Currency} from "../Currencies/Currency";
import {CurrencyManager} from "../Managers/CurrencyManager";
import {orderReport} from "../Types";
import {FiatCurrency} from "../Currencies/FiatCurrency";

export class Order extends SingleUserTransaction {

  private status: OrderStatus;
  
  private readonly payCurrency : Currency;
  
  private readonly total : number;

  private readonly targetAmount: number;

  private readonly amountDue: number;

  public constructor (parentAccount: Account, ticker: String, payTicker : String, a: number, timestamp : Date, tAmount: number) {
    super(parentAccount, ticker, a, timestamp);
    this.amountDue = a;
    this.total = Math.floor(a / CurrencyManager.getInstance().getCurrency(ticker).getRateUSD() * CurrencyManager.getInstance().getCurrency(payTicker).getRateUSD() * 100) / 100 ;
    if(this.total==0)
    {
      throw "Insufficient to buy 0.01"
    }
    this.payCurrency = CurrencyManager.getInstance().getCurrency(payTicker);
    this.targetAmount = tAmount;
    this.status = OrderStatus.InProgress;
  }

  public getTargetAmount(): number {
    return this.targetAmount;
  }

  public cancel() {
    this.status = OrderStatus.Cancelled
    super.cancel();
  }

  public getOrderStatus(): OrderStatus {
    return this.status;
  }

  public checkOrder() {
    //  TODO - implement Order.checkOrder
  }

  public getAmountDue(): number {
    return this.amountDue;
  }
  
  public getTotal() : number{
    return this.total;
  }
  
  public getPayCurrencyTicker() : String{
    return this.payCurrency.getTicker();
  }
  
  private fixZeros(num : number) : String{
    let x = num.toString()
    if(x.length < 2)
    {
      return "0" + x
    }
    return x
  }

  public getOrderReport(id : number) : orderReport
  {
    if(this.payCurrency instanceof FiatCurrency){
      return {
        "id" : id,
        "time" : this.timestamp.getFullYear()+"/"+this.fixZeros(this.timestamp.getMonth()+1)+"/"+this.fixZeros(this.timestamp.getDate())+" "+this.fixZeros(this.timestamp.getHours())+":"+this.fixZeros(this.timestamp.getMinutes()),
        "pair" : this.payCurrency.getTicker()+"/"+this.currency.getTicker(),
        "type" : "BUY",
        "addiType" : "price",
        "additional" : (Math.ceil((this.amount/this.total)*100)/100).toString(),
        "from_amount" : this.amount,
        "to_amount" : this.total
      }
    }
    else{
      return {
        "id" : id,
        "time" : this.timestamp.getFullYear()+"/"+this.fixZeros(this.timestamp.getMonth()+1)+"/"+this.fixZeros(this.timestamp.getDate())+" "+this.fixZeros(this.timestamp.getHours())+":"+this.fixZeros(this.timestamp.getMinutes()),
        "pair" : this.payCurrency.getTicker()+"/"+this.currency.getTicker(),
        "type" : "SELL",
        "addiType" : "price",
        "additional" : (Math.ceil((this.total/this.amount)*100)/100).toString(),
        "from_amount" : this.amount,
        "to_amount" : this.total
      }
    }
  }
  
  public confirmExecuted() {
    super.confirmExecuted();
    this.status = OrderStatus.Complete;
  }
}

enum OrderStatus {

  InProgress,

  Complete,

  Cancelled,
}
