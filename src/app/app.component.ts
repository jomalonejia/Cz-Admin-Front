import {Component, ViewContainerRef} from '@angular/core';
import {AuthHttp} from 'app/services/http';
import * as constants from './constants';
import {empty} from 'rxjs/Observer';
import {of} from 'rxjs/observable/of';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import  * as fromAuth from 'app/reducers/auth';
import * as authActions from 'app/actions/auth';
import {HttpClient} from '@angular/common/http';
import {ToastsManager} from 'ng2-toastr';
import {CustomToasterService} from 'app/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private http:HttpClient,
              private router:Router,
              private store: Store<fromAuth.State>,
              ) {

    this.http.get(constants.REFRESH_TOKEN_URL)
      .catch(err => {
        this.store.dispatch(new authActions.RefreshFailedAction());
        return of(err);
      })
      .subscribe(res =>{
        this.store.dispatch(new authActions.RefreshSuccessAction(res));
      });
  }
}
