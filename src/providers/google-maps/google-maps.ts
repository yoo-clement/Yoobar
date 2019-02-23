import { Injectable } from '@angular/core';
import { ConnectivityProvider } from '../connectivity/connectivity';
import { Geolocation } from 'ionic-native';
import { Events } from 'ionic-angular';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

declare var google;

@Injectable()
export class GoogleMapsProvider {
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string;
 
  constructor(public connectivityService: ConnectivityProvider, public events: Events) {
 
  }

  /*ionViewDidLoad(): void {    
    setTimeout(()=>{
      this.loadGoogleMaps();
    }, 100);
  }*/
 
  init(mapElement: any, pleaseConnect: any): Promise<any> {
    this.apiKey = "AIzaSyBtMAYoXxgijXa8S5RWWwdwQajloNQtrkk";
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
 
    return this.loadGoogleMaps();
 
  }
 
  loadGoogleMaps(): Promise<any> {
 
    return new Promise((resolve) => {
 
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();
 
        if(this.connectivityService.isOnline()){
 
          window['mapInit'] = () => {
 
            this.initMap().then(() => {
              resolve(true);
            });
 
            this.enableMap();
          }
 
          let script = document.createElement("script");
          script.id = "googleMaps";
 
          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
          }
 
          document.body.appendChild(script);  
 
        } 
      }
      else {
 
        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }
 
      }
      this.addConnectivityListeners();
    });
  }
 
  initMap(): Promise<any> {
 
    this.mapInitialised = true;
 
    return new Promise((resolve) => {

        Geolocation.getCurrentPosition().then((position) => {
 
        // UNCOMMENT FOR NORMAL USE
        //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        /*let mapOptions = {
          center: latLng,
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          disableDefaultUI: true,
          controls: {
              compass: true,
              myLocationButton: true,
              indoorPicker: true,
              zoom: true
          },
          gestures: {
              scroll: true,
              tilt: true,
              rotate: true,
              zoom: true
          }
        }*/

        //this.map = new google.maps.Map(this.mapElement, mapOptions);

        mapboxgl.accessToken = 'pk.eyJ1IjoieW9vLWNsZW1lbnQiLCJhIjoiY2pjcW1pdTVlMXE3NDJwbzR1N3Q2bWJkdyJ9.BaKw19aVlMv8qP2J_-CXFg';

        this.map = new mapboxgl.Map({
          container: 'map', // HTML container id
          style: 'mapbox://styles/mapbox/streets-v9', // style URL
          center: [position.coords.longitude, position.coords.latitude], // starting position as [lng, lat]
          zoom: 13
        });

        /*this.map.animateCamera({
            target: latLng,
            zoom: 17,
            tilt: 60,
            bearing: 140,
            duration: 5000
        });*/

        /*new google.maps.Marker({
            map: this.map,
            icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                new google.maps.Size(22, 22),
                new google.maps.Point(0, 18),
                new google.maps.Point(11, 11)),
            position: latLng
        });*/

        resolve(true);
      });
    });
  }

  disableMap(): void {
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
  }
 
  enableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
  }
 
  addConnectivityListeners(): void {
 
    document.addEventListener('online', () => {
 
      console.log("online");
 
      setTimeout(() => {
 
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        } 
        else {
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
 
      }, 2000);
 
    }, false);
 
    document.addEventListener('offline', () => {
 
      console.log("offline");
 
      this.disableMap();
 
    }, false);
  }
 
  addMarker(lat: number, lng: number, key: any) {

    /*let latLng = new google.maps.LatLng(lat, lng);
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      icon: 'assets/icon/yoomap_picto.png'
    });*/

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(assets/icon/pint.png)';
    el.style.width = '33px';
    el.style.height = '35px';

    let marker = new mapboxgl.Marker(el)
    .setLngLat([lng, lat])
    .setPopup(new mapboxgl.Popup({ offset: 25 })) // add popups
    .addTo(this.map);
 
    /*google.maps.event.addListener(marker, 'click', () => {
      this.events.publish('marker:click', key);
    });*/

    el.addEventListener('click', () => 
    { 
      this.events.publish('marker:click', key);
    }
); 

    return this.markers.push(marker);
  }
}
