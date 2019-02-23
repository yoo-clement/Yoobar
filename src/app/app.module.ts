import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { HttpModule } from '@angular/http';
import { LoginPageModule } from '../pages/login/login.module';
import { PaymentModule } from './payment.module';
import { AngularFireDatabase } from 'angularfire4/database';
import { AngularFireAuth } from 'angularfire4/auth';

import { UsersServiceProvider } from '../providers/users-service/users-service';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { LocationsProvider } from '../providers/locations/locations';
import { BarsDetailsPageModule } from '../pages/bars-details/bars-details.module';
import { BarsServiceProvider } from '../providers/bars-service/bars-service';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TabsBarmanPage } from '../pages/tabs-barman/tabs-barman';
import { BarOrdersPage } from '../pages/bar-orders/bar-orders';
import { UsersDetailPage } from '../pages/users-detail/users-detail';
import { BarsDetailsPage } from '../pages/bars-details/bars-details';
import { BarmanDetailsPage } from '../pages/barman-details/barman-details';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    TabsBarmanPage,
    BarOrdersPage,
    UsersDetailPage,
    BarmanDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PaymentModule,
    IonicModule.forRoot(MyApp, { backButtonText: '' }),
    LoginPageModule,
    BarsDetailsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    TabsBarmanPage,
    BarOrdersPage,
    UsersDetailPage,
    BarsDetailsPage,
    BarmanDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersServiceProvider,
    ConnectivityProvider,
    GoogleMapsProvider,
    LocationsProvider,
    BarsServiceProvider,
    AngularFireDatabase,
    AngularFireAuth
  ]
})
export class AppModule {}
