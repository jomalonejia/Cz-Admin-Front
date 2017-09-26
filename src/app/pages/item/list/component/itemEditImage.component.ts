import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'item-edit-image',
  styles: [
    '.image-body{min-height: 350px;margin-left:35px;}',
    'li{float:left;width: 30%;margin: 10px}',
  ],
  template: `

    <div class="modal1">
      <div class="modal-header">
        <span>Item Content</span>
        <button class="close" aria-label="Close" (click)="closeModal()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!--<div class="image-body">
          
        </div>-->
        <!--<nb-card size="small">
          <nb-card-header>
            Index Images
          </nb-card-header>
          <nb-card-body>
            <cz-image [image]="this.image"></cz-image>
          </nb-card-body>
        </nb-card>-->
        <nb-card size="small">
          <nb-card-header>
            Index Images
          </nb-card-header>
          <nb-card-body>
            <div>
              <cz-image [size]="large" [image]="this.image"></cz-image>
            </div>
          </nb-card-body>
        </nb-card>
        <nb-card size="medium">
          <nb-card-header>
            Minus Images
          </nb-card-header>
          <nb-card-body>
            <ul>
              <li *ngFor="let image of this.minusImages">
                <cz-image [image]="image"></cz-image>
              </li>
            </ul>
          </nb-card-body>
        </nb-card>
      </div>
      <div class="modal-footer">
        <button class="btn btn-md btn-primary" (click)="closeModal()">Cancel</button>
        <button class="btn btn-md btn-primary" (click)="saveItemContent()">Cancel</button>
      </div>
    </div>

    <!--<div>
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
                 &lt;!&ndash; <cz-image [image]="image">
                  </cz-image>&ndash;&gt;
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
    </div>-->
  `
})

export class ItemEditImageComponent {

  image: string;
  minusImages: string[];

  constructor(private activeModal: NgbActiveModal) {
  }

  closeModal() {
    this.activeModal.close();
  }

  ngOnInit() {
  }

}
