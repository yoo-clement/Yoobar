import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarsDetailsPage } from './bars-details';

@NgModule({
  declarations: [
    BarsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BarsDetailsPage),
  ],
})
export class BarsDetailsPageModule {}
