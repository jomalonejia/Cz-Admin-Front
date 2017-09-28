export class User {
  public fullname:string;
  public username:string;
  public password:string;


  constructor(fullname: string, username: string, password: string) {
    this.fullname = fullname;
    this.username = username;
    this.password = password;
  }
}

