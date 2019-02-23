import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
    selector: 'page-bar-menu',
    templateUrl: 'bar-menu.html'
})
export class BarMenuPage  {
    private information: any[];
    private barId: any;
    private userId: any;
    private ShoppingCart: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.barId = navParams.get('param1');
        this.userId = firebase.auth().currentUser.uid;
        this.ShoppingCart = firebase.database().ref('paniers/' + this.userId);
        this.displayMenu(this.barId);
    }

    displayMenu(theBarId) {
        let barMenu = firebase.database().ref('produits').child(theBarId);

        barMenu.once('value', (snapshot) => {
            this.information = this.snapshotToArray(snapshot);
        });
    }

    snapshotToArray(snapshot) {
        var returnArr = [];

        snapshot.forEach(function (childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            returnArr.push(item);
        });

        return returnArr;
    };

    toggleSection(i) {
        this.information[i].open = !this.information[i].open;
    }

    /*toggleItem(i, j) {
        console.log(i);
        console.log(j);
        this.information[i].children[j].open = !this.information[i].children[j].open;
    }*/

    changeQty(index: number, information, categorie, nomCategorie) {
        var that = this;
        if (information.qty == 0) {
            that.ShoppingCart.child(this.barId).child(categorie).child('children').child(index).remove();
            this.checkIfChildExists(this.barId, categorie);
        }
        else {
            that.ShoppingCart.child(this.barId).child(categorie).child('children').child(index).set({
                description: information.description,
                litrage: information.litrage,
                quantite: information.qty,
                prix: information.prix,
                total: Math.round((information.qty * information.prix) * 100) / 100,
                nom: information.nom,
            });

            that.ShoppingCart.child(this.barId).child(categorie).update({
                nom: nomCategorie
            });
        }
    }

    checkIfChildExists(barId, categorie) {
        var that = this;
        that.ShoppingCart.child(barId).child(categorie).child('children').once('value', function(snapshot) {
            if(snapshot.numChildren() == 0) {
                that.ShoppingCart.child(barId).child(categorie).remove();
            }
        });
    }

    ViewMyShoppingCart() {
        this.navCtrl.push('ShoppingCartPage', {
            param1: this.barId,
        });
    }
}