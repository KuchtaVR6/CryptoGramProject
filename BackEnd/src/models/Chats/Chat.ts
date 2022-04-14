import {User} from "../People/User";
import {CustomerServiceAgent} from "../People/CustomerServiceAgent";
import {CSAManager} from "../Managers/CSAManager";
import {Message} from "./Message";
import {Person} from "../People/Person";

export class Chat {

  private user: User;

  private messages: Map<number,Message>;

  private csa: CustomerServiceAgent;

  private isActive: boolean;

  public constructor(user : User) {
    this.user = user;
    this.messages = new Map<number, Message>();
    this.csa = CSAManager.getInstance().getAvailableAgent();
    this.isActive = true;
  }

  public addMessage(author: Person, text: String): Message {
    if(this.isActive)
      return new Message(text,author instanceof User)
    else
      throw "Chat inactive"
  }

  public deactivate() {
    this.isActive = false;
  }
}
