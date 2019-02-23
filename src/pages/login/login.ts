import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
	providers: [UsersServiceProvider]
})

export class LoginPage {
	
	public emailField: any;
	public passwordField: any;

	constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private usersService: UsersServiceProvider, private toastCtrl: ToastController) {
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
			this.navCtrl.setRoot(TabsPage);
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

	submitRegister() {
		this.navCtrl.push('RegisterPage');
	}

	BarmanLogin() {
		this.navCtrl.push('BarmanLoginPage');
	}

	googleSignIn() {
		this.usersService.googleSignInUser()
		.then(() => {
			let toast = this.toastCtrl.create({
				message: 'Bienvenue sur l\'application Yoobar !',
				duration: 3000
			});
			toast.present();
		});
	}

	facebookSignIn() {
		this.usersService.facebookSignInUser()
		.then(() => {
			let toast = this.toastCtrl.create({
				message: 'Bienvenue sur l\'application Yoobar !',
				duration: 3000
			});
			toast.present();
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
