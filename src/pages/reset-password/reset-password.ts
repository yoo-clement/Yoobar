import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-reset-password',
	templateUrl: 'reset-password.html',
})

export class ResetPasswordPage {

	public username: any;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.username = this.navParams.get('userdetails');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ResetPasswordPage');
	}
}
