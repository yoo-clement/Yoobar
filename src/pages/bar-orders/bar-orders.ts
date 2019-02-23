import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarsServiceProvider } from '../../providers/bars-service/bars-service';

@IonicPage()
@Component({
	selector: 'page-bar-orders',
	templateUrl: 'bar-orders.html',
})
export class BarOrdersPage {
	constructor(public navCtrl: NavController, public navParams: NavParams, private barsService: BarsServiceProvider) {
		//this.displayBarOrders();
	}

	/*displayBarOrders() {
    this.barsService.viewBarOrders()
      .then(snapshot => {
      })
  	}*/
}
