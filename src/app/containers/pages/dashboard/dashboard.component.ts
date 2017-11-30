import {Component, ViewContainerRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastsManager} from 'ng2-toastr';
import {CustomToasterService} from 'app/services/toaster';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  constructor(public toastr: ToastsManager,
              vcr: ViewContainerRef,
              private toasterService:CustomToasterService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  showSuccess() {
    /*this.toastr.success('You are awesome!', 'Success!');*/
    this.toasterService.toasterTip({message:'success',type:''});
  }

  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }

  showCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
  }


}
