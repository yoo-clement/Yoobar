import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UsersServiceProvider } from '../../providers/users-service/users-service';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
	selector: 'page-register',
	templateUrl: 'register.html',
	providers: [UsersServiceProvider]
})

export class RegisterPage {
	public pseudoField: any;
	public emailField: any;
	public phoneNumberField: any;
	public passwordField: any;

	constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams, private usersService: UsersServiceProvider) {
	}

	signUpUser() {
		let loader = this.loadingCtrl.create({
			content: "Connexion ...",
			duration: 3000,
			dismissOnPageChange: true
		});
		loader.present();

		this.usersService.signUpUser(this.pseudoField, this.emailField, this.phoneNumberField, this.passwordField)
		.then(authData => {
			this.navCtrl.setRoot(TabsPage);
		}, error => {
			loader.dismiss()
			.then(() => {
				let alert = this.alertCtrl.create({
					title: 'Erreur à la connexion',
					subTitle: error.message,
					buttons: ['OK']
				});

				alert.present();
			})
		});
	}
}
