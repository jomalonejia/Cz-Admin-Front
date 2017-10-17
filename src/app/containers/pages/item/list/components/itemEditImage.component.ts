import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ItemService} from '../../item.service';
import {ItemImage} from 'app/models';


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
        <nb-card size="medium">
          <nb-card-header>
            Index Images
          </nb-card-header>
          <nb-card-body>
            <div class="image-index">
              <cz-image [size]="'large'" [image]="image"></cz-image>
            </div>
          </nb-card-body>
        </nb-card>
        <nb-card size="medium">
          <nb-card-header>
            Minus Images
          </nb-card-header>
          <nb-card-body>
            <ul>
              <li *ngFor="let image of images">
                {{image.image}}
                <!--<cz-image [image]="image.image | czImagePipe" [size]="'meduim'"></cz-image>-->
              </li>
            </ul>
          </nb-card-body>
        </nb-card>
      </div>
      <div class="modal-footer">
        <button class="btn btn-md btn-primary" (click)="closeModal()">Close</button>
      </div>
    </div>
  `
})

export class ItemEditImageComponent {
  image: string;
  itemId: string;
  images: object[] = new Array<object>(6);
  minusImages: string[];

  constructor(private activeModal: NgbActiveModal,
              private itemService: ItemService) {
   /* this.itemService.selectImages(this.itemId)
      .subscribe(images => {
        for (let i = 0; i < 6; i++) {
          this.images[i] = {image:images[i] || ''}
        }
      });*/
  }

  ngOnInit() {

  }

  closeModal() {
    this.activeModal.close();
  }

}
