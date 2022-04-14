import {PersonManager} from "../Managers/PersonManager";
import {UserJSON} from "../Types";
import bcrypt from 'bcrypt';

export abstract class Person {
  
  private id : number;

  private firstName: String;

  private surName: String;

  private username: String;

  private password: String;

  private email: String;

  private emailVerified: boolean;

  public constructor(id : number,args: String[]) {
    this.id = id
    this.firstName = args[0]
    this.surName = args[1]
    this.username = args[2]
    this.password = bcrypt.hashSync(args[3].toString(), 10);
    this.email = args[4]
    this.emailVerified = false;
  }

  public getFirstName(): String {
    return this.firstName;
  }

  public setFirstName(firstName: String) {
    this.firstName = firstName;
  }

  public getSurName(): String {
    return this.surName;
  }

  public setSurName(surName: String) {
    this.surName = surName;
  }

  public getFullName(): String {
    return this.firstName+" "+this.surName;
  }

  public getUsername(): String {
    return this.username;
  }

  public setUsername(username: String) {
    this.username = username;
  }

  public getEmail(): String {
    return this.email;
  }

  public setEmail(email: String) {
    this.email = email;
  }

  public VerifyEmail() {
    this.emailVerified = true;
  }

  public searchForUser(query: String): UserJSON[] {
    return PersonManager.getInstance().fetchUsersByQuery(query,this);
  }

  public setPassword(text: String) {
    this.password = bcrypt.hashSync(text.toString(), 10);
  }

  public checkPassword(text: String): boolean {
    return bcrypt.compareSync(text.toString(), this.password.toString());
  }
  
  public getID() : number{
    return this.id
  }
}
