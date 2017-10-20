import {Component, EventEmitter, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ItemService} from '../../item.service';
import {ItemImage} from 'app/models';
import * as constants from 'app/constants/http.constants';
import {Observable} from 'rxjs/Observable';


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
              <cz-image 
                [size]="'large'" 
                [image]="image" 
                [uploadUrl]="imageUploadUrl"
                [uploadParam]="itemId"
                [specificId]="itemId">
                
              </cz-image>
            </div>
          </nb-card-body>
        </nb-card>
        <nb-card size="medium">
          <nb-card-header>
            Minus Images
          </nb-card-header>
          <nb-card-body>
            <ul>
              <li *ngFor="let image of images$ | async ; let index = index">
                <cz-image
                  [image]="image.url | czImagePipe" 
                  [size]="'meduim'"
                  [uploadUrl]="imagesUploadUrl"
                  [uploadParam]="itemId + '/'+ image.position"
                  [specificId]="image.position">
                </cz-image>
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

  @Output() uploadSuccess = new EventEmitter<number>();

  image: string;
  itemId: string;
  images$:Observable<any>;
  minusImages: string[];

  imageUploadUrl:string = constants.ITEM_UPDATE_IMAGE_URL;
  imagesUploadUrl:string = constants.ITEM_IMAGES_UPDATE_URL;

  constructor(private activeModal: NgbActiveModal,
              private itemService: ItemService) {

  }

  ngOnInit() {
    this.images$ = this.itemService.selectImages(this.itemId);
    this.images$.subscribe(v => console.log(v));
  }

  closeModal() {
    this.uploadSuccess.emit()
    this.activeModal.close();
  }

}
