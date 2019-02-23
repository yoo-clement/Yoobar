import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
//import { TabsPage } from '../pages/tabs/tabs';
import { TabsBarmanPage } from '../pages/tabs-barman/tabs-barman';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    var config = {
      apiKey: "AIzaSyCKPJzM8oKQZoc3jeJ9s0ahgXg0sNu_i30",
      authDomain: "yoobarapp.firebaseapp.com",
      databaseURL: "https://yoobarapp.firebaseio.com",
      projectId: "yoobarapp",
      storageBucket: "yoobarapp.appspot.com",
      messagingSenderId: "565037933388"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.uid) {
          //this.rootPage = TabsPage;
          this.rootPage = TabsBarmanPage;
      }
      else {
        this.rootPage = LoginPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
