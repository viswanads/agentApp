import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { InsertInfoProvider } from '../../providers/insert-info/insert-info';
import { CheckSessionProvider } from '../../providers/check-session/check-session';

import { LoginPage } from '../login/login';

/**
 * Generated class for the InsertInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insert-info',
  templateUrl: 'insert-info.html',
})
export class InsertInfoPage {
  loading: Loading;
  locations:any[];
  optionsList:any[];
  registerCredentials = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public insertInfo: InsertInfoProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public session: CheckSessionProvider) {
  }

  ionViewDidEnter(){
    this.showLoading();
    this.session.getSession().subscribe(allowed => {
    var oldSessionTime : number = <number> <any> localStorage.getItem("session");
    var newSessionTime : number = <number> <any> allowed.session;
    var diffSessionTime : number = newSessionTime - oldSessionTime;
    // console.log('oldSessionTime ',typeof oldSessionTime);
    // console.log('newSessionTime ',typeof newSessionTime);
    // console.log('diffSessionTime ',typeof diffSessionTime);
    // console.log(diffSessionTime);
      if (localStorage.getItem("session") === null || diffSessionTime > 60) { 
        this.showSessionError();    
        localStorage.clear();
        this.navCtrl.setRoot(LoginPage);    
      } else {
        // this.loading.dismiss();
        window.localStorage.setItem('session',allowed.session);
      }
    },
      error => {
        this.showError('error');
     });
  }


  ionViewDidLoad() {
    if(localStorage.getItem("session") !== null){
      this.insertInfo.getInfo().subscribe(allowed => {
        //this.loading.dismiss();
        if (allowed.status == 'Success') {   
          this.showError(allowed);     
          // this.nav.push(HomePage);
          this.optionsList = allowed.data;
          this.locations = allowed.locations;
       // this.navCtrl.setRoot(InsertInfoPage); 
        } else {
          this.showError(allowed);
        }
      },
        error => {
          this.showError('error');
       });
    }
    else{
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);
    }
  }

  signOut(){
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
    }, 3000);
  }
  dismissLoading(){
    this.loading.dismiss();
  }
  showError(allowed) {
     //
    let alert = this.alertCtrl.create({
      title: allowed.title,
      subTitle: allowed.subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
  showSessionError() {
   // this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'session expired' ,
      buttons: ['OK']
    });
    alert.present();
  }
}
