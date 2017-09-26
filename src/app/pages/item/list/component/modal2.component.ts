import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal1',
  template: `
    <h1>modal2</h1>
  `,
})
export class Modal2Component {

  item:object;

  constructor(private activeModal: NgbActiveModal) { }



  closeModal() {
    this.activeModal.close();
  }
}
