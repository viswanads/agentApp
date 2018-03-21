import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';

/*
  Generated class for the CheckSessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

var url = 'http://gogreeneconomy.com/movieApp/agentModule/';
@Injectable()
export class CheckSessionProvider {

  constructor(public http: Http) {
    console.log('Hello CheckSessionProvider Provider');
  }
  getSession(){

    return Observable.create(observer => {
      // var subUrl = 'getRequestForInsertInfo.php';
      // var data = 'mobile='+credentials.mobile+'&password='+credentials.password;
      // var currentUrl = url+subUrl+data;
      // this.http.get(currentUrl).map(res => res.json()).subscribe(data => {
       
      //   observer.next(data);
      //   observer.complete();

      var subUrl = 'checkSession.php';
      //var data = 'mobile='+credentials.mobile+'&password='+credentials.password;
      var currentUrl = url+subUrl;
      this.http.get(currentUrl).map(res => res.json()).subscribe(data => {
        observer.next(data);
        observer.complete();
      })
     // if(this.posts['status'] == 'No login found')
  })
  }
}
