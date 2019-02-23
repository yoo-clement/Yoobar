import { Component, OnInit, HostListener } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { PaymentServicesProvider } from '../../providers/payment-services/payment-services';
import { environment } from '../../app/app.stripe.config';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html'
})

export class ShoppingCartPage implements OnInit {
    private information: any[];
    private infoInRealTime: any[];
    private barId: any;
    private userId: any;
    private ShoppingCart: any;
    private amount: number = 0;
    private handler: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private paymentSvc: PaymentServicesProvider) {
        this.barId = navParams.get('param1');
        this.userId = firebase.auth().currentUser.uid;
        this.ShoppingCart = firebase.database().ref('paniers/' + this.userId);
        this.displayShoppingCart();
    }

    ngOnInit() {
        this.handler = StripeCheckout.configure({
            key: environment.stripeKey,
            locale: 'auto',
            token: token => {
                this.paymentSvc.processPayment(token, this.amount)
            }
        });
    }

    handlePayment() {
        var that = this;
        this.handler.open({
            name: 'Yoobar',
            image: 'assets/icon/pint.png',
            description: 'Paiement',
            amount: that.amount*100,
            currency: 'eur',
            panelLabel: "Payer"
        });
    }

    @HostListener('window:popstate')
    onpopstate() {
        this.handler.close()
    }

    displayShoppingCart() {
        var that = this;
        that.ShoppingCart.child(this.barId).once('value', (snapshot) => {
            that.information = that.snapshotToArray(snapshot);
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

    changeQty(index: number, child, key) {
        var that = this;

        that.ShoppingCart.child(this.barId).child(key).child('children').child(index).update({
            quantite: child.quantite,
            total: Math.round((child.quantite * child.prix)*100)/100,
        });

        that.amount = 0;
        that.ShoppingCart.child(this.barId).on('value', (snapshot) => {
            that.infoInRealTime = that.snapshotToArray(snapshot);
            Object.keys(that.infoInRealTime).forEach(function (key) {
                Object.keys(that.infoInRealTime[key].children).forEach(function (i) {
                    that.amount += that.infoInRealTime[key].children[i].total;
                });
            });
        });
    }

    removeItem(key: string) {
        var that = this;
        that.ShoppingCart.child(this.barId).child(key).remove();        
    }

    toggleSection(i) {
        this.information[i].open = !this.information[i].open;
    }

    toggleItem(i, j) {
        this.information[i].children[j].open = !this.information[i].children[j].open;
    }
}
