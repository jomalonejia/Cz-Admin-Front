export class User {
  public firstName:string;
  public lastName:string;
  public username:string;
  public password:string;
  public email:string;


  constructor(firstName: string, lastName: string, username: string, password: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}

