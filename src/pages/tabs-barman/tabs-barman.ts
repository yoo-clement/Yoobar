import { Component } from '@angular/core';
import { BarOrdersPage } from '../bar-orders/bar-orders';
import { BarmanDetailsPage } from '../barman-details/barman-details';

@Component({
  templateUrl: 'tabs-barman.html'
})
export class TabsBarmanPage {

  tab1Root = BarOrdersPage;
  tab2Root = BarmanDetailsPage;

  constructor() {

  }

}
