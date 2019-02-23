import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarsServiceProvider } from '../../providers/bars-service/bars-service';

@IonicPage()
@Component({
  selector: 'page-bars-details',
  templateUrl: 'bars-details.html',
  providers: [BarsServiceProvider]
})

export class BarsDetailsPage {
  private barId: any;
  private Address: any;
  private Desc: any;
  private Name: any;
  private Schedule: any = [];
  private WifiId: any;
  private WifiPwd: any;
  private photo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barsService: BarsServiceProvider) {
      this.barId = navParams.get('param1');
      this.displayBar(this.barId);
  }

  displayBar(theBarId) {
    var that = this;
    this.barsService.viewBar(theBarId)
      .then(snapshot => {
        that.Address = snapshot.val().adresse;
        that.Desc = snapshot.val().description;
        that.Name = snapshot.val().nom;
        that.photo = snapshot.val().photo;
        var wifi = snapshot.child("wi-fi");
        that.WifiId = wifi.val().identifiant;
        that.WifiPwd = wifi.val().mdp;
        var timetable = snapshot.child("horaires");
        timetable.forEach(function (childSnapshot) {
            that.Schedule.push({
                day: childSnapshot.key,
                schedule: childSnapshot.val()
            });
        });
      })
  }

  ViewMenu() {
      this.navCtrl.push('BarMenuPage', {
          param1: this.barId
      });
  }
}
