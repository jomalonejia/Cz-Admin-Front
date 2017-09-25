import {Component, Inject} from "@angular/core";
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";


@Component({
  selector: 'item-edit-image',
  styles:[
    'li {float: left;margin:10px;}',
  ],
  template:`

    <div>
      <h1 md-dialog-title>Edit</h1>
      <div md-dialog-content>
        <md-expansion-panel>
          <md-expansion-panel-header>
            <md-panel-description>
              Item Edit
            </md-panel-description>
          </md-expansion-panel-header>

          <div>
            <ul>
              <li *ngFor="let image of this.images">
                <md-card class="example-card">
                 <!-- <cz-image [image]="image">
                  </cz-image>-->
                </md-card>
              </li>
            </ul>
          </div>
        </md-expansion-panel>
        
        <br><br>
        
        <md-expansion-panel>
          <md-expansion-panel-header>
            <md-panel-title>
              Showing Images
            </md-panel-title>
            <md-panel-description>
              Upload Showing images
            </md-panel-description>
          </md-expansion-panel-header>

          <div>
            <md-card class="example-card">
              <img md-card-sm-image src="http://otlht2gvo.bkt.clouddn.com/FgCT5ZtZiSXTC8tHZohHVBhrPxgc" alt="Photo of a Shiba Inu">
            </md-card>
            <md-card class="example-card">
              <img md-card-sm-image src="http://otlht2gvo.bkt.clouddn.com/FgCT5ZtZiSXTC8tHZohHVBhrPxgc" alt="Photo of a Shiba Inu">
            </md-card>
            <md-card class="example-card">
              <img md-card-sm-image src="http://otlht2gvo.bkt.clouddn.com/FgCT5ZtZiSXTC8tHZohHVBhrPxgc" alt="Photo of a Shiba Inu">
            </md-card>
            <md-card class="example-card">
              <img md-card-sm-image src="http://otlht2gvo.bkt.clouddn.com/FgCT5ZtZiSXTC8tHZohHVBhrPxgc" alt="Photo of a Shiba Inu">
            </md-card>
            <md-card class="example-card">
              <img md-card-sm-image src="http://otlht2gvo.bkt.clouddn.com/FgCT5ZtZiSXTC8tHZohHVBhrPxgc" alt="Photo of a Shiba Inu">
            </md-card>
            <md-card class="example-card">
              <img md-card-sm-image src="http://otlht2gvo.bkt.clouddn.com/FgCT5ZtZiSXTC8tHZohHVBhrPxgc" alt="Photo of a Shiba Inu">
            </md-card>
          </div>
        </md-expansion-panel>
      </div>
      <div md-dialog-actions>
        <button md-raised-button color="primary" [md-dialog-close]="" tabindex="2">Ok</button>
        <button md-raised-button color="warn" (click)="onNoClick()" tabindex="-1">Cancel</button>
      </div>
    </div>
  `
})

export class ItemEditImageComponent{

  images:string[];

  constructor(public dialogRef: MdDialogRef<ItemEditImageComponent>,
              @Inject(MD_DIALOG_DATA) public data: any){
      this.images = this.data.minusImages;
  }

  ngOnInit(){
    console.log(this.data.minusImages);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
