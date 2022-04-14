import {Account} from "../Account";
import {Person} from "./Person";
import {Chat} from "../Chats/Chat";
import {FiatCurrency} from "../Currencies/FiatCurrency";

export class User extends Person {

  private readonly account: Account;

  private chats: Map<number,Chat>;

  private phoneNumber: String;

  private kycVerified: boolean;

  private mfaKey: String;

  public constructor (id : number, args: String[], pNumber: String, prefTicker : String) {
    super(id,args);
    this.phoneNumber = pNumber;
    this.chats = new Map<number, Chat>();
    this.kycVerified = false;
    this.mfaKey = "";
    this.account = new Account(this, prefTicker)
  }

  public getPhoneNumber(): String {
    return this.phoneNumber;
  }

  public setPhoneNumber(phoneNumber: String) {
    this.phoneNumber = phoneNumber;
  }

  public getHelp(): Chat {
    return new Chat(this);
  }

  public getAccount(): Account {
    return this.account;
  }

  public VerifyKYC() {
    this.kycVerified = true;
  }

  public getMfaKey(): String {
    return this.mfaKey;
  }

  public setMfaKey(mfaKey: String) {
    this.mfaKey = mfaKey;
  }
}
