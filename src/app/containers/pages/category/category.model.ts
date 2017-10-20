export class Category {
  private id:number;
  private parentId:number;
  private name:string;


  constructor(id: number, parentId: number, name: string) {
    this.id = id;
    this.parentId = parentId;
    this.name = name;
  }
}

