import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
//import { AuthService } from '../providers/auth-service/auth-service';
import { InsertInfoPage } from '../pages/insert-info/insert-info';
import { HttpModule } from '@angular/http';
import { InsertInfoProvider } from '../providers/insert-info/insert-info';
import { CheckSessionProvider } from '../providers/check-session/check-session';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    InsertInfoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    InsertInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //AuthService,
    InsertInfoProvider,
    CheckSessionProvider,
  ]
})
export class AppModule {}
