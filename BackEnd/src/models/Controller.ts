import {PersonManager} from "./Managers/PersonManager";
import {Person} from "./People/Person";
import {CurrencyManager} from "./Managers/CurrencyManager";
import {User} from "./People/User";
import {Order} from "./Transaction/Order";
import {Account} from "./Account";
import {Transaction} from "./Transaction/Transaction";

export class Controller {
  private sessions : Map<String,[Person,Date]>;
  private standingOrders : Map<Account, Transaction>
  
  private static instance: Controller | null = null;
  
  private constructor() {
    this.sessions = new Map<String, [Person, Date]>();
    this.standingOrders = new Map<Account, Transaction>();
  }

  public static getInstance(): Controller {
    if (this.instance == null) {
      this.instance = new Controller()
    }
    return this.instance;
  }
  
  private generateToken() : String{
    let x = Buffer.from(Math.random().toString()).toString("base64");
    while(this.sessions.has(x)){
      x = Buffer.from(Math.random().toString()).toString("base64");
    }
    return x
  }
  
  private addSession(person : Person) : String{
    let token = this.generateToken();
    this.sessions.set(token,[person, new Date(+new Date() + 60000*15)])
    return token;
  }
  
  private validateSession(sessionToken : String) : Person{
    const x = this.sessions.get(sessionToken);
    if(x && new Date(x[1]) > new Date())
    {
      x[1] = new Date(+new Date() + 60000*15)
      return x[0];
    }
    throw "Access Denied"
  }

  public login(email: String, password: String){
    if(!email || !password)
    {
      throw("Missing Arguments")
    }
    try {
      let person = PersonManager.getInstance().getPersonByEmail(email)
      if(person.checkPassword(password))
      {
        return {"response" : true, "token" : this.addSession(person)}
      }
      return({"response" : false})
    }
    catch (e) {
      if (e === "UserNotFound")
      {
        return({"response" : false})
      }
      else{
        throw e;
      }
    }
  }

  public fetchCurrencies(sessionToken: String) {
    if(!sessionToken)
    {
      throw("Missing Arguments")
    }
    let user = this.validateSession(sessionToken) as User
    let account = user.getAccount()
    return {
      "currenciesCrypto" : CurrencyManager.getInstance().getAvailableCryptoCurrenciesJSON(),
      "currenciesFiat" : CurrencyManager.getInstance().getAvailableFiatCurrenciesJSON(),
      "preferredCurrency" : account.getPreferredCurrency()
    }
  }

  public fetchHoldings(sessionToken: String) {
    if(!sessionToken)
    {
      throw("Missing Arguments")
    }
    let user = (this.validateSession(sessionToken) as User)
    let account = user.getAccount()
    return {
      "name" : user.getFirstName(),
      "crypto" : account.getCryptoHoldings(),
      "fiat" : account.getFiatHoldings()
    };
  }

  public searchUser(sessionToken: String, query: String) {
    if(!sessionToken || !query)
    {
      throw("Missing Arguments")
    }
    let person = this.validateSession(sessionToken)
    let array = PersonManager.getInstance().fetchUsersByQuery(query,person)
    if(array.length<1) {
      return {
        "count": 0,
        "matches" : []
      }
    }
    return {
      "count" : array.length,
      "matches" : array
    }
  }
  
  public requestSend(sessionToken: String, amount : number, cTicker : String, dateTime : String, id : string, type : String)
  {
    if(!sessionToken || !amount || !cTicker || !dateTime || !id || !type)
    {
      throw("Missing Arguments")
    }
    let account = (this.validateSession(sessionToken) as User).getAccount()
    if(type==="request")
    {
      let request = account.request(cTicker,amount,id, dateTime);
      (PersonManager.getInstance().getPersonByID(parseInt(id)) as User).getAccount().addTransaction(request)
      return {"response" : true}
    }
    else if(type==="send")
    {
      let transfer = account.transfer(cTicker, amount, id, dateTime);
      account.executeTransaction(transfer);
      (PersonManager.getInstance().getPersonByID(parseInt(id)) as User).getAccount().addTransaction(transfer)
      return {"response" : true}
    }
  }

  public order(sessionToken: String, amount : number, payTicker : String, getTicker : String, type : String)
  {
    if(!sessionToken || !amount || !payTicker || !getTicker  || !type)
    {
      throw("Missing Arguments")
    }
    let account = (this.validateSession(sessionToken) as User).getAccount()
    let order = (account.order(getTicker, payTicker, amount, 0, "now now") as Order)
    if(this.standingOrders.has(account))
    {
      this.standingOrders.get(account)!.cancel();
    }
    this.standingOrders.set(account,order);
    return {"total": order.getTotal()};
  }
  
  public confirmTransaction(sessionToken : String, confirm : boolean)
  {
    if(!sessionToken)
    {
      throw("Missing Arguments")
    }
    let account = (this.validateSession(sessionToken) as User).getAccount()
    if(this.standingOrders.has(account))
    {
      if(confirm) {
        account.executeTransaction(this.standingOrders.get(account)!)
        return {"response": "executed"}
      }
      else {
        this.standingOrders.get(account)!.cancel()
        return {"response": "canceled"}
      }
    }
    else{
      throw "No transactions to confirm"
    }
  }
  
  public tradingHistory(sessionToken : String)
  {
    if(!sessionToken)
    {
      throw("Missing Arguments")
    }
    let account = (this.validateSession(sessionToken) as User).getAccount()
    return {
      "crypto" : account.getOrderReport()
    }
  }

  public fetchNotification(sessionToken: String) {
    if(!sessionToken)
    {
      throw("Missing Arguments")
    }
    try {
      let account = (this.validateSession(sessionToken) as User).getAccount()
      return {
        "notifications": account.getNotifications()
      }
    }
    catch (e) {
      if(e === "No notifications")
        return {
        "No_notifications": true
        };
      else{
        throw e;
      }
    }
  }
  
  public dismissNotification(sessionToken : String, id : number)
  {
    if(!sessionToken || id<0)
    {
      throw("Missing Arguments")
    }
    (this.validateSession(sessionToken) as User).getAccount().removeNotification(id);
  }
}
