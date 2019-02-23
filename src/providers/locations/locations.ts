import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
 
@Injectable()
export class LocationsProvider {

  data: any;
  public locations: any;
 
  constructor(public http: Http) {
    //this.locations = firebase.database().ref('locations');
    this.locations = firebase.database().ref('bars');
  }
 
  load(){
    if(this.data){
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.locations.on("value", function(snapshot) {
        resolve(snapshot.val());
        /*snapshot.forEach(function (childSnapshot) {
          resolve(childSnapshot.val());
        });*/
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    });
  }
}


 
