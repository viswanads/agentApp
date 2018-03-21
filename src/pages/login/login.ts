import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { InsertInfoPage } from '../insert-info/insert-info';
import { CheckSessionProvider } from '../../providers/check-session/check-session';
//import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  authData = {'mobile':'','password':''};
 // constructor(private navCtrl: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private auth: AuthService, public navParams: NavParams) {
  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public navParams: NavParams, public session: CheckSessionProvider) {
    }
  ionViewWillEnter(){
    this.showLoading();
    this.session.getSession().subscribe(allowed => {
    this.loading.dismiss();      
    localStorage.clear();
      if (localStorage.getItem("session") === null) {  
      window.localStorage.setItem('session',allowed.session);
      } else {
       // this.navCtrl.setRoot(InsertInfoPage); 
      }
    },
      error => {
        this.showError('error');
     });
  }

  ionViewDidLoad() {
    //localStorage.clear();
  }
  public login() {
  this.showLoading();
  //window.localStorage.setItem('userName',this.authData.mobile);
  this.loading.dismiss();
  this.navCtrl.setRoot(InsertInfoPage); 
  // this.auth.login(this.authData).subscribe(allowed => {
  //   if (allowed.status == 'Success') {        
  //    // this.nav.push(HomePage);
  //    window.localStorage.setItem('userName',allowed.status);
  //   this.navCtrl.setRoot(InsertInfoPage); 
  //   } else {
  //     this.showError(allowed);
  //   }
  // },
  //   error => {
  //     this.showError('error');
  //  });
}

showLoading() {
  this.loading = this.loadingCtrl.create({
    content: 'Please wait...',
    dismissOnPageChange: true
  });
  this.loading.present();
}

showError(allowed) {
  this.loading.dismiss();

  let alert = this.alertCtrl.create({
    title: allowed.title,
    subTitle: allowed.subTitle,
    buttons: ['OK']
  });
  alert.present();
}

}
