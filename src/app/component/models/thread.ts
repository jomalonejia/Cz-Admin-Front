import {Message} from "./message";

export class Thread{
  id:number;
  lastMessage:Message;
  currentUsername:string;

  constructor(id,lastMesage,currentUsername){
    this.id = id;
    this.lastMessage = lastMesage;
    this.currentUsername = currentUsername;
  }

}
