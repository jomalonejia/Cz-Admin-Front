import {Component, Inject} from "@angular/core";
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";

@Component({
  selector: 'item-edit-content',
  template: `
    <div>
      <h1 md-dialog-title>Edit</h1>
      <div md-dialog-content>
        <quill-editor [(ngModel)]="content"
                      [options]="editorOptions" (change)="change()">
        </quill-editor>
      </div>
      <div md-dialog-actions>
        <button md-raised-button color="primary" (click)="addItemContent()" tabindex="2">Ok</button>
        <button md-raised-button color="warn" (click)="close()" tabindex="-1">Cancel</button>
      </div>
    </div>
  `
})
export class ItemEditContentComponent {


  constructor(/*public itemService:ItemService,*/
              public dialogRef: MdDialogRef<ItemEditContentComponent>,
              @Inject(MD_DIALOG_DATA) public data: any){
  }

  public content = ``;
  public editorOptions = {
    placeholder: "insert content..."
  };


  ngOnInit() {

  }

  change(){

  }

  addItemContent(){
    /*this.itemService.addContent({itemContent:this.content})
      .subscribe(v => console.log(v));*/
    //this.close();
  }

  close(){
    this.dialogRef.close();
  }

}
