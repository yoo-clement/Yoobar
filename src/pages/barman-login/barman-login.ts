import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UsersServiceProvider } from '../../providers/users-service/users-service'
import { TabsBarmanPage } from '../tabs-barman/tabs-barman';

@IonicPage()
@Component({
  selector: 'page-barman-login',
  templateUrl: 'barman-login.html',
})
export class BarmanLoginPage {
	public emailField: any;
	public passwordField: any;
  	
  	constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private usersService: UsersServiceProvider) {
  	}

  	submitLogin() {
		let loader = this.loadingCtrl.create({
			content: "Connexion ...",
			duration: 3000,
			dismissOnPageChange: true
		});

		loader.present();

		this.usersService.loginUser(this.emailField, this.passwordField)
		.then(authData => {
			this.navCtrl.setRoot(TabsBarmanPage);
		}, error => {
			loader.dismiss()
			.then(() => {
				let alert = this.alertCtrl.create({
					title: 'Erreur',
					subTitle: error.message,
					buttons: ['OK']
				});

				alert.present();
			})
		});
	}

	showForgotPassword() {
		let prompt = this.alertCtrl.create({
			title: 'Renseignez votre email',
			message: "Un nouveau mot de passe vous sera envoyé à cette adresse",
			inputs: [
				{
					name: 'recoverEmail',
					placeholder: 'Email'
				},
			],
			buttons: [
				{
					text: 'Annuler',
					handler: data => {
						console.log('Annuler');
					}
				},
				{
					text: 'Envoyer',
					handler: data => {

						let loading = this.loadingCtrl.create({
							content: "Réinitialisation de votre mot de passe",
							duration: 3000,
							dismissOnPageChange: true
						});
						loading.present();

						this.usersService.forgotPasswordUser(data.recoverEmail)
						.then(() => {
							loading.dismiss()
							.then(() => {
								let alert = this.alertCtrl.create({
									title: 'Vérifiez votre boîte mail',
									subTitle: 'Mot de passe réinitialisé avec succès' ,
									buttons: ['OK']
								});
								alert.present();
							})
						}, error => {
							loading.dismiss()
							.then(() => {
								let alert = this.alertCtrl.create({
									title: 'Erreur lors de la réinitialisation du mot de passe',
									subTitle: error.message,
									buttons: ['OK']
								});
								alert.present();
							})
						});
					}
				}
			]
		});
		prompt.present();
	}
}
