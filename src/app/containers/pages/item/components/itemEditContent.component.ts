import {Component, Inject} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ItemService} from '../services';
import {CustomToasterService} from 'app/services/toaster';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'item-edit-content',
  template: `
    <div class="modal1">
      <div class="modal-header">
        <span>Item Content</span>
        <button class="close" aria-label="Close" (click)="closeModal()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="item-edit-content">
          <quill-editor [(ngModel)]="content"
                        [options]="editorOptions">
          </quill-editor>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-md btn-primary" (click)="closeModal()">Cancel</button>
        <button class="btn btn-md btn-primary" (click)="saveItemContent()">Save</button>
      </div>
      <div class="my-container">
        <ngx-loading [show]="loading" [config]="{ backdropBorderRadius: '14px' }"></ngx-loading>
      </div>
    </div>
  `,
  styles: [
    '.item-edit-content {background-color:#fff;}',

  ],
})
export class ItemEditContentComponent {

  loading: boolean = false;
  itemId: string;

  public content;
  public editorOptions = {
    placeholder: 'insert content...'
  };

  constructor(private activeModal: NgbActiveModal,
              private itemService: ItemService,
              private toasterService: CustomToasterService) {
  }

  closeModal() {
    this.activeModal.close();
  }

  saveItemContent() {
    this.loading = true;
    this.itemService.updateContent({itemId:this.itemId,content: this.content})
      .catch(err => {
        this.loading = false;
        this.toasterService.toasterTip({message: 'Save Content Failed!', type: 'error'});
        return Observable.throw(err);
      })
      .subscribe(v => {
        this.loading = false;
        this.toasterService.toasterTip({message: 'Save Content Success!', type: 'success'});
        setTimeout(this.closeModal(), 2000);
      });

  }


}
