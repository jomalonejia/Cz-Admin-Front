import { Component } from '@angular/core';
import {AuthHttp} from 'app/services/http';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  constructor(private http:HttpClient){
    this.http.get('api/item/test')
      .subscribe(v => console.log(v));
  }


}
