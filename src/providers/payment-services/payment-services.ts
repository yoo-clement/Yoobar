import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire4/database';
import { AngularFireAuth } from 'angularfire4/auth';


@Injectable()
export class PaymentServicesProvider {
  userId: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe((auth) => {
          if (auth) this.userId = auth.uid
      });
  }

  processPayment(token: any, amount) {
      const payment = { token, amount };
      return this.db.list('/payments/'+this.userId).push(payment);
  }
}
