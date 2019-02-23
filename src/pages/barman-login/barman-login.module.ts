import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarmanLoginPage } from './barman-login';

@NgModule({
  declarations: [
    BarmanLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(BarmanLoginPage),
  ],
})
export class BarmanLoginPageModule {}
