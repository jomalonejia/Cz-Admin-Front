export class Category {
  private id:number;
  private parentId:number;
  private categoryName:string;


  constructor(id: number, parentId: number, categoryName: string) {
    this.id = id;
    this.parentId = parentId;
    this.categoryName = categoryName;
  }
}

