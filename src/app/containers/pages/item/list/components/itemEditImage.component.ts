import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'item-edit-image',
  styles: [
    '.image-body{min-height: 350px;margin-left:35px;}',
    '.image-index{margin-left: 20%}',
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
        <nb-card size="small">
          <nb-card-header>
            Index Images
          </nb-card-header>
          <nb-card-body>
            <div class="image-index">
              <cz-image [size]="'large'" [image]="this.image"></cz-image>
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
                <cz-image [image]="image" [size]="'meduim'"></cz-image>
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
