import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal3',
  template: `
   <h1>modal3</h1>
  `,
})
export class Modal3Component {

  item:object;

  constructor(private activeModal: NgbActiveModal) { }



  closeModal() {
    this.activeModal.close();
  }
}
