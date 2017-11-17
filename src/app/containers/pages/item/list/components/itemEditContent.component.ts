import {Component, Inject} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ItemService} from '../../services';

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
       <div *ngIf="saveProgress">
         <h1>loading......</h1>
       </div>
     </div>
     <div class="modal-footer">
       <button class="btn btn-md btn-primary" (click)="closeModal()">Cancel</button>
       <button class="btn btn-md btn-primary" (click)="saveItemContent()">Save</button>
     </div>
   </div>
  `,
  styles:[
    '.item-edit-content {background-color:#fff;}',

  ],
})
export class ItemEditContentComponent {


  constructor(private activeModal: NgbActiveModal,
              private itemService:ItemService){
  }

  saveProgress:boolean = true;

  public content = ``;
  public editorOptions = {
    placeholder: 'insert content...'
  };

  closeModal() {
    this.activeModal.close();
  }



  saveItemContent(){
   this.itemService.addContent({itemContent:this.content})
      .subscribe(v => console.log(v));

  }


}
