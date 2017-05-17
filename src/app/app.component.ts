import { ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
import {MdIconRegistry, MdDialog, MdDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogComponent} from './dialog/dialog.component';
import { MapsAPILoader, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import {EstablishmentsService} from './establishments.service';
import {GeoLocationService} from './geolocation.service';
import {GooglePlacesRadarSearchService} from './google-places-radar-search.service';
import {GooglePlacesNearbySearchService} from './google-places-nearby-search.service';
declare var google: any;

@Component({
  selector: 'app-root',
	providers: [GoogleMapsAPIWrapper, EstablishmentsService],
  templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
	@ViewChild('agmMap') ag: any;
  latLngBounds: any;
  lat: number = 51.678418;
  lng: number = 7.809007;
  isDarkTheme = false;
	markers: any[] = [];

	constructor(iconRegistry: MdIconRegistry,
							sanitizer: DomSanitizer, 
							private dialog: MdDialog, 
              private radarSearchSvc: GooglePlacesRadarSearchService,
              private nearbySearchSvc: GooglePlacesNearbySearchService,
              private establishmentsSvc: EstablishmentsService,  
              private geoSvc: GeoLocationService,
							private gmapsApi: GoogleMapsAPIWrapper,
							private mapsAPILoader: MapsAPILoader) {
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');

    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
    establishmentsSvc.getCurrentSelection().subscribe( selection => {
      console.log('current selection', selection);
    })
  }

  changePlaceType(type: string){
    console.log(type);
    this.getPlacesByType(type);
  }

  ngAfterViewInit() {
  }

  private openAdminDialog() {
		this.dialog.open(DialogComponent).afterClosed()
  }

  clickedMarker($event: any) {
    console.log('clicked marker', $event)
    this.radarSearchSvc.search({lat: this.lat, lng: this.lng}, 'cafe').subscribe(result => console.log('radar search result', result));
    this.establishmentsSvc.setCurrentSelection({place_id: $event});
  }

	mapClicked($event: MouseEvent) {
		console.log('click', $event);
  }

  mapChanged($event: MouseEvent) {
  //   console.log('mapChanged', $event);
  }

  private getPlacesByType(placeType: string): void{

      this.geoSvc.getLocation().toPromise().then(position => {
        const coords = position.coords;
        var bounds = new google.maps.LatLngBounds();

        this.lat = coords.latitude;
        this.lng = coords.longitude;
        const pos = {lat: this.lat, lng: this.lng};

        const srch = new Promise((resolve, reject) => {

          this.nearbySearchSvc.searchRankedByDistance(pos, placeType).toPromise().then( data => {
            console.log('nearby search svc', data);
            data.forEach( ( result, i ) => {
              if (i < 2) bounds.extend(result.geometry.location);
              this.markers.push({label: i + '', place_id: result.place_id, lat: result.geometry.location.lat, lng: result.geometry.location.lng });

            }); // forEach

            resolve(this.markers);

            });
        });

        srch.then((data) => {
          console.log('markers', this.markers);
          this.latLngBounds = bounds;
          this.markers.push({lat: pos.lat, lng: pos.lng, draggable: false});
        });
      }).catch(err => console.log(err));
  }

	ngOnInit(): void {

      this.geoSvc.getLocation().toPromise().then(position => {
        const coords = position.coords;
        var bounds = new google.maps.LatLngBounds();

        this.lat = coords.latitude;
        this.lng = coords.longitude;
        const pos = {lat: this.lat, lng: this.lng};

        const srch = new Promise((resolve, reject) => {

          //this.radarSearchSvc.search(pos, 'cafe').toPromise().then( data => {
          this.nearbySearchSvc.searchRankedByDistance(pos, 'cafe').toPromise().then( data => {
            console.log('nearby search svc', data);
            data.forEach( ( result, i ) => {
              if (i < 2) bounds.extend(result.geometry.location);
              this.markers.push({label: i + '', place_id: result.place_id, lat: result.geometry.location.lat, lng: result.geometry.location.lng });

            }); // forEach

            resolve(this.markers);

            });
        });

        srch.then((data) => {
          console.log('markers', this.markers);
          this.latLngBounds = bounds;
          this.markers.push({lat: pos.lat, lng: pos.lng, draggable: false});
        });
      }).catch(err => console.log(err));

  }


}
