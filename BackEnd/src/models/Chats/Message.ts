export class Message {
  private readonly byUser: boolean;

  private readonly content: String;

  public constructor (content: String, byUser: boolean) {
    this.byUser  = byUser;
    this.content = content;
  }

  public getByUser(): boolean {
    return this.byUser;
  }
  
  public getContent() : String{
    return this.content;
  }
}
