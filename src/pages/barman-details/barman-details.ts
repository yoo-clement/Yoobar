import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsersServiceProvider } from '../../providers/users-service/users-service';

@Component({
  selector: 'page-barman-details',
  templateUrl: 'barman-details.html',
})
export class BarmanDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private usersService: UsersServiceProvider) {
  }

  logUserOut() {
    this.usersService.logoutUser()
    .then(() => {
      this.navCtrl.setRoot('LoginPage');
    });
  }
}
