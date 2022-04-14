import {Chat} from "../Chats/Chat";
import {Person} from "./Person";
import {Message} from "../Chats/Message";

/* *no need to implement */

export class CustomerServiceAgent extends Person {

  private chats: Map<number,Chat>;

  private status: CSAStatus;

  private profilePicturePath: String;

  public constructor (id : number, args: String[], path: String) {
    super(id, args);
    this.profilePicturePath = path;
    this.status = CSAStatus.offline;
    this.chats = new Map<number,Chat>();
  }

  public getProfilePicturePath(): String {
    return this.profilePicturePath;
  }

  public setProfilePicturePath(profilePicturePath: String) {
    this.profilePicturePath = profilePicturePath;
  }

  public getStatus(): CSAStatus {
    return this.status;
  }

  public setStatus(status: CSAStatus) {
    this.status = status;
  }

  public addChat(chat: Chat) {
    this.chats.set(this.chats.size,chat);
  }

  public receiveMessage(m: Message): Message {
    return m;
  }
  
}

enum CSAStatus {

  available,

  busy,

  offline,
}
