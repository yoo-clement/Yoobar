import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-users-detail',
  templateUrl: 'users-detail.html',
  providers: [UsersServiceProvider]
})

export class UsersDetailPage {
  //private userPhotoUrl: any;
  //private userDisplayName: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private usersService: UsersServiceProvider) {
    var myUserId = firebase.auth().currentUser.uid;
    this.displayUser(myUserId);
  }

  displayUser(theUserId) {
    //var that = this;
    this.usersService.viewUser(theUserId)
    .then(snapshot => {
      //that.userPhotoUrl = snapshot.val().photo;
      //that.userDisplayName = snapshot.val().username || snapshot.val().email;
    })
  }

  logUserOut() {
    this.usersService.logoutUser()
    .then(() => {
      this.navCtrl.setRoot('LoginPage');
    });
  }
}
