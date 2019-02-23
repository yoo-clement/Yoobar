import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountBarmanPage } from './account-barman';

@NgModule({
  declarations: [
    AccountBarmanPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountBarmanPage),
  ],
})
export class AccountBarmanPageModule {}
