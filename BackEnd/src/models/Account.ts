import {User} from "./People/User";
import {Transaction} from "./Transaction/Transaction";
import {CreditCard} from "./CreditCard";
import {Currency} from "./Currencies/Currency";
import {Portfolio} from "./Wallets/Portfolio";
import {CurrencyManager} from "./Managers/CurrencyManager";
import {FiatCurrency} from "./Currencies/FiatCurrency";
import {currencyFiat, Holding, notification, performance, orderReport, transactionNotification} from "./Types";
import {Order} from "./Transaction/Order";
import {Request} from "./Transaction/Request";
import {Transfer} from "./Transaction/Transfer";
import {PersonManager} from "./Managers/PersonManager";
import {Deposit} from "./Transaction/Deposit";
import {MultiUserTransaction} from "./Transaction/MultiUserTransaction";

export class Account {

  private readonly owner: User;

  private readonly transactions: Map<number,Transaction>;

  private cards: Map<number,CreditCard>;
  
  private notifications: Map<number, notification>

  private preferredCurrency: Currency;

  private portfolio: Portfolio;

  public constructor (user : User, prefTicker : String) {
    this.owner = user;
    this.transactions = new Map<number, Transaction>();
    this.notifications = new Map<number, notification>();
    this.cards = new Map<number, CreditCard>();
    this.preferredCurrency = CurrencyManager.getInstance().getCurrency(prefTicker)
    this.portfolio = new Portfolio(this);
  }

  public getPastPerformance(): performance[] {
    //  TODO - implement Account.getPastPerformance
    throw "UnsupportedOperationException";
  }
  
  public getOrderReport(): orderReport[]{
    let id = 0;
    let reversed = Array.from(this.transactions).reverse()
    let result : orderReport[] = new Array();
    reversed.forEach(([key, value]) => {
      if(value instanceof Order && value.isExecuted()) {
        result[id] = (value as Order).getOrderReport(id);
        id += 1;
      }
      if(value instanceof Transfer) {
        result[id] = (value as Transfer).getReport(id, this);
        id += 1;
      }
    })
    return result;
  }

  public delCreditCard(index: number) {
    //  TODO - implement Account.delCreditCard
    throw "UnsupportedOperationException";
  }

  public addCreditCard(card: CreditCard) {
    //  TODO - implement Account.addCreditCard
    throw "UnsupportedOperationException";
  }

  public order(ticker: String, payTicker : String, amount : number, tAmount: number, timestamp : String) : Order{
    if(amount > 0){
      let cur: Date = new Date();;
      if(timestamp !== "now now")
      {
        cur = new Date(timestamp.toString());
      }
      return new Order(this, ticker, payTicker, amount, cur, tAmount);
    }
    else{
      throw "Invalid Arguments";
    }
      
  }

  public deposit(ticker: String, amount: number): void {
    this.portfolio.receiveMoney(ticker, amount);
  }

  public withdraw(ticker: String, amount: number, aNo: String, sCode: String, timestamp : String): number {
    //  TODO - implement Account.withdraw
    throw "UnsupportedOperationException";
  }

  public depositC(ticker: String, amount: number, address: String, timestamp : String): number {
    //  TODO - implement Account.depositC
    throw "UnsupportedOperationException";
  }

  public withdrawC(ticker: String, amount: number, address: String, timestamp : String): number {
    //  TODO - implement Account.withdrawC
    throw "UnsupportedOperationException";
  }

  public request(ticker: String, amount: number, receiver: String, timestamp : String): Request {
    let transaction = new Request(this, ticker, amount, new Date(), (PersonManager.getInstance().getPersonByID(parseInt(receiver.toString())) as User).getAccount())
    return transaction;
  }

  public transfer(ticker: String, amount: number, receiver: String, timestamp : String): Transfer {
    if(timestamp==="now now") {
      return new Transfer(this, ticker, amount, new Date(), (PersonManager.getInstance().getPersonByID(parseInt(receiver.toString())) as User).getAccount(), amount)
    }
    return new Transfer(this,ticker,amount,new Date(timestamp.toString()),(PersonManager.getInstance().getPersonByID(parseInt(receiver.toString())) as User).getAccount(),amount)
  }

  public getCard(Id: number): CreditCard {
    //  TODO - implement Account.getCard
    throw "UnsupportedOperationException";
  }

  public searchForUser(query: String): User[] {
    //  TODO - implement Account.searchForUser
    throw "UnsupportedOperationException";
  }

  public executeTransaction(t: Transaction): boolean {
    this.transactions.set(this.transactions.size,t);
    t.confirmExecuted();
    this.portfolio.executeTransaction(t);
    return true;
  }
  
  public receiveMoney(ticker : String, amount : number) : void {
    this.portfolio.receiveMoney(ticker,amount)
  }

  public addTransaction(t: Transaction) {
    this.transactions.set(this.transactions.size,t)
    if(t instanceof Request)
    {
      this.addNotification(t,"request")
    }
    else if(t instanceof Transfer)
    {
      this.addNotification(t,"send");
      this.portfolio.receiveMoney(t.getCurrencyTicker(),t.getAmount());
    }
    else
    {
      throw "UnsupportedOperation"
    }
  }
  
  public addNotification(t: Transaction, type : String) {
    let transaction = (t as MultiUserTransaction).createNotification()
    let json = {
      "id" : this.notifications.size,
      "type" : type,
      "transaction" : transaction
    }
    this.notifications.set(this.notifications.size, json)
  }

  public getNotifications() : notification[] {
    let x = new Array();
    let id = 0;
    this.notifications.forEach( function (value) {
      x[id] = value;
      id+=1;
    })
    if(x.length>0)
    {
      return x;
    }
    else{
      throw "No notifications";
    }
  }

  public getTransactions(): Transaction[] {
    //  TODO - implement Account.getTransactions
    throw "UnsupportedOperationException";
  }

  public getPreferredCurrency() : currencyFiat{
    // TODO
    return {
      "id": this.preferredCurrency.getID(),
      "ticker": this.preferredCurrency.getTicker(),
      "sign" : (this.preferredCurrency as FiatCurrency).getSign(),
      "name": this.preferredCurrency.getName(),
      "USD": 1 / CurrencyManager.getInstance().findRate(this.preferredCurrency.getTicker())
    }
  }

  public getCryptoHoldings() : Holding[]{
    return this.portfolio.getCryptoHoldings()
  }

  public getFiatHoldings() : Holding[]{
    return this.portfolio.getFiatHoldings()
  }
  
  public getOwner() : User{
    return this.owner
  }

  public removeNotification(id: number) {
    this.notifications.delete(id);
  }
}
