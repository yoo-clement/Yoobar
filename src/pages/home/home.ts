import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocationsProvider } from '../../providers/locations/locations';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { NavController, Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

    constructor(public navCtrl: NavController, public maps: GoogleMapsProvider, public platform: Platform, public locations: LocationsProvider, public events: Events) {
    }

    ionViewDidLoad() {

        this.platform.ready().then(() => {

            let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
            let locationsLoaded = this.locations.load();

            Promise.all([
                mapLoaded,
                locationsLoaded
            ]).then((result) => {

                let locations = result[1];
                var i = 0;
                for(var location in locations){
                    this.maps.addMarker(locations[location].localisation.latitude, locations[location].localisation.longitude, Object.keys(locations)[i]);
                    i++;
                }
            });
        });

        this.events.subscribe('marker:click', (key) => {
            this.navCtrl.push('BarsDetailsPage', {
                param1: key
            });
        });
    }
}
