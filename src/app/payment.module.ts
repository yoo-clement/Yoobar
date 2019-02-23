import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentServicesProvider } from '../providers/payment-services/payment-services';
import { AngularFireModule } from 'angularfire4';
import { FIREBASE_CONFIG } from './app.firebase.config';

@NgModule({
    imports: [
        CommonModule,
        AngularFireModule.initializeApp(FIREBASE_CONFIG)
    ],
    providers: [
        PaymentServicesProvider
    ]
})
export class PaymentModule { }

