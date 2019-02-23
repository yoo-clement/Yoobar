import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class UsersServiceProvider {

	//private data: any;
	public fireAuth: any;
	public userProfile: any;

	constructor(public http: Http) {
		this.fireAuth = firebase.auth();
		this.userProfile = firebase.database().ref('users');
	}

	viewUser(userId: any) {
		var userRef = this.userProfile.child(userId);
		return userRef.once('value');
	}

	/*loadUser(number) {
		if(this.data) {
			return Promise.resolve(this.data);
		}

		return new Promise(resolve => {
			this.http.get('https://randomuser.me/api/?results='+number)
				.map(res => res.json())
				.subscribe(data => {
					this.data = data.results;
					resolve(this.data);
				})
		})
	}*/

	signUpUser(pseudo: string, email: string, phone: string, password: string) {
		// Création de l'utilisateur
		return this.fireAuth.createUserWithEmailAndPassword(email, password)
		.then((newUser) => {
			// Authentification
			this.fireAuth.signInWithEmailAndPassword(email, password)
			.then((authenticatedUser) => {
				// Création du profil utilisateur dans la BDD 'users'
				this.userProfile.child(authenticatedUser.uid).set({
					pseudo: pseudo,
					email: email,
					phone: phone
				})
			})
		})
	}

	loginUser(email: string, password: string) {
		return this.fireAuth.signInWithEmailAndPassword(email, password);
	}

	googleSignInUser() {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/plus.login');

		var that = this;

		return firebase.auth().signInWithRedirect(provider)
		.then(function(result) {
			if(result.user) {
				var user = result.user;
				var res = result.user.displayName.split(" ");

				that.userProfile.child(user.uid).set({
					email: user.email,
					photo: user.photoURL,
					username: user.displayName,
						name: {
							first: res[0],
							middle: res[1],
							last: res[2]
						},
				});
			}
		}).catch(function(error) {
			console.log(error);
		});
	}

	facebookSignInUser() {

		var provider = new firebase.auth.FacebookAuthProvider();
		var that = this;

		return firebase.auth().signInWithRedirect(provider)
		.then(function(result) {
			if(result.user) {
				var user = result.user;
				var res = result.user.displayName.split(" ");

				that.userProfile.child(user.uid).set({
					email: user.email,
					photo: user.photoURL,
					username: user.displayName,
						name: {
							first: res[0],
							middle: res[1],
							last: res[2]
						},
				});
			}
		}).catch(function(error) {
			console.log(error);
		});
	}

	logoutUser() {
		return this.fireAuth.signOut();
	}

	forgotPasswordUser(email: any) {
		return this.fireAuth.sendPasswordResetEmail(email);
	}
}
