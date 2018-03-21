import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Headers,RequestOptions} from '@angular/http';
 
export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
 
var url = 'http://localhost/phpApi/';
@Injectable()
export class AuthService {
  url: string;
  posts: any;
  //var posts = null;
  currentUser: User;
  constructor(private http:Http) {
//  var url = 'http://localhost/phpApi/auth.php?mobile=9505068780&password=kasi';
//         var response = this.http.get(url).map(res => res.json());
//         console.log(response);

  }   
   
  public login(credentials) {
   
    if (credentials.mobile === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // var subUrl = 'auth.php?';
        // var data = 'mobile='+credentials.mobile+'&password='+credentials.password;
        // var currentUrl = url+subUrl+data;
        // this.http.get(currentUrl).map(res => res.json()).subscribe(data => {
        //   this.posts = data;
        //   observer.next(this.posts);
        //   observer.complete();

      //   var headers = new Headers();
      //   headers.append("Accept", 'application/json');
      //   headers.append('Content-Type', 'application/json' );
      //   let options = new RequestOptions({ headers: headers });
         let subUrl = 'auth-post.php';
         let params = credentials;
         let currentUrl = url+subUrl;
         console.log(params);
      //   this.http.post(currentUrl,postParams).map(res => res.json()).subscribe(data => {
      //     this.posts = data;
      //     observer.next(this.posts);
      //     observer.complete();
      //   });
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });
   
      
      this.http.post(currentUrl, params, options).map(res => res.json()).subscribe(data => {

          observer.next(data);
          observer.complete();
         }, error => {
          console.log(error);// Error getting the data
        });
        });
       // if(this.posts['status'] == 'No login found')
    }
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}