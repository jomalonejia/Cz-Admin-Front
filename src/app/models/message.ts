import {Thread} from "./thread";
export class Message {
  public messageId:string;
  public threadId: string;
  public username: string;
  public text: string;
  public profile:string;
  public sentTime: Date;
  public sentTo: string;
  public isFailed: boolean;


  constructor(obj?) {
    this.messageId = obj && obj.messageId || '';
    this.threadId = obj && obj.threadId || '';
    this.username = obj && obj.username || '';
    this.text = obj && obj.text || '';
    this.profile = obj && obj.profile || '';
    this.sentTime = obj && obj.sentTime || '';
    this.sentTo = obj && obj.sentTo || '';
    this.isFailed = obj && obj.isFailed || false;
  }
}
