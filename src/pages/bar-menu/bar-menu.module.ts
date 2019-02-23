import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarMenuPage } from './bar-menu';

@NgModule({
  declarations: [
    BarMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(BarMenuPage),
  ],
})
export class BarMenuPageModule {}
