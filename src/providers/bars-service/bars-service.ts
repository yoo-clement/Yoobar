import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class BarsServiceProvider {
  private barProfile: any;
  private barMenu: any;
  private ShoppingCart: any;

  constructor(public http: Http) {
    this.barProfile = firebase.database().ref('bars');
    this.barMenu = firebase.database().ref('produits');
    this.ShoppingCart = firebase.database().ref('paniers');
  }

  viewBar(barId: any) {
    var barRef = this.barProfile.child(barId);
    return barRef.once('value');
  }

  viewMenu(barId: any) {
    var MenuRef = this.barMenu.child(barId);
    
    return new Promise(resolve => {
      MenuRef.on("value", function(snapshot) {
          console.log(snapshot.val());
          resolve(snapshot.val());
      });
    })
  }

  viewShoppingCart(barId: any, userId: any) : Promise<any> {
    var CartRef = this.ShoppingCart.child(userId).child(barId);

    return new Promise(resolve => {
      CartRef.on("value", function(snapshot) {
        resolve(snapshot);
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    });
  }

  viewBarOrders() {
    return "lol";
  }
}
