import {Component, Inject} from "@angular/core";
import {MD_DIALOG_DATA, MdDialog, MdDialogRef} from "@angular/material";
import {ItemEditImageComponent} from './itemEditImage.component';
import {ItemEditContentComponent} from "./itemEditContent.component";

@Component({
  selector: 'item-edit',
  styles:[
    'i {font-size: 30px}',
    '.item-edit-image-button {margin:20px}',
    '.item-edit-button {margin:3px}',

],
  template: `
    <div>
      <h1 md-dialog-title>Edit</h1>
      <div md-dialog-content>
        <form class="example-form">
          <p>
            <md-form-field class="full-width">
              <input mdInput placeholder="title" [value]="this.item.title">
            </md-form-field>
          </p>
          <p>
            <md-form-field class="full-width">
              <input mdInput placeholder="price" [value]="this.item.price">
            </md-form-field>
          </p>
          <p>
            <md-form-field class="full-width">
              <textarea mdInput placeholder="describe" [value]="this.item.describe1"></textarea>
            </md-form-field>
          </p>
          <p>
            <button class="item-edit-image-button"  md-fab color="accent" (click)="openImageDialog()">
              <i class="ion-images"></i>
            </button>
            
            <button class="item-edit-image-button"  md-fab color="accent" (click)="openContentDialog()">
              <i class="ion-ios-paper"></i>
            </button>
          </p>
        </form>
      </div>
      <div md-dialog-actions>
        <button class="item-edit-button" md-raised-button color="primary" [md-dialog-close]="" tabindex="2">Ok</button>
        <button class="item-edit-button" md-raised-button color="warn" (click)="onNoClick()" tabindex="-1">Cancel</button>
      </div>
    </div>
  `
})
export class ItemEditComponent {

  item:object;

  constructor(public imageDialog: MdDialog,
              public contentDialog:MdDialog,
              public dialogRef: MdDialogRef<ItemEditComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {

    this.item = this.data.item;
  }

  ngOnInit(){
    console.log(this.item['minusImages']);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openImageDialog(){
    let dialogRef = this.imageDialog.open(ItemEditImageComponent, {
      width: '550px',
      data: { minusImages:this.item['minusImages'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openContentDialog(){
    let dialogRef = this.contentDialog.open(ItemEditContentComponent, {
      width: '800px',
      data: {minusImages:this.item['minusImages'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
