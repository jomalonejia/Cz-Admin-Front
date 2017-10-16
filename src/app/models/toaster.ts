export class Toaster {
  public message:string;
  public type:string;

  constructor(message: string, type: string = 'success') {
    this.message = message;
    this.type = type;
  }
}
