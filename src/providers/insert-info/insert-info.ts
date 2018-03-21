import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
//import {Http, Headers,RequestOptions} from '@angular/http';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the InsertInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

var url = 'http://localhost/phpApi/';
@Injectable()
export class InsertInfoProvider {

  constructor(public http: Http) {
    console.log('Hello InsertInfoProvider Provider');
  }

  public getInfo() {
   
    
      return Observable.create(observer => {
        // var subUrl = 'getRequestForInsertInfo.php';
        // var data = 'mobile='+credentials.mobile+'&password='+credentials.password;
        // var currentUrl = url+subUrl+data;
        // this.http.get(currentUrl).map(res => res.json()).subscribe(data => {
         
        //   observer.next(data);
        //   observer.complete();

        var subUrl = 'getRequestForInsertInfo.php';
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