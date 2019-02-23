import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarOrdersPage } from './bar-orders';

@NgModule({
  declarations: [
    BarOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(BarOrdersPage),
  ],
})
export class BarOrdersPageModule {}
