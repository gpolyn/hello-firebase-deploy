import { ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
import {MdIconRegistry, MdDialog, MdDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogComponent} from './dialog/dialog.component';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import {EstablishmentsService} from './establishments.service';
import { SelectedPlaceTypeService } from './selected-place-type.service';
import {GeoLocationService} from './geolocation.service';
import { Observable } from 'rxjs/Observable';
import {GooglePlacesNearbySearchService} from './google-places-nearby-search.service';
import {PlaceType} from './place-types';
declare var google: any;

@Component({
  selector: 'app-root',
	providers: [GoogleMapsAPIWrapper, EstablishmentsService],
  templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
	@ViewChild('agmMap') ag: any;
  placeType = PlaceType;
  latLngBounds: any;
  lat: number = 51.678418;
  lng: number = 7.809007;
  isDarkTheme = false;
	markers: any[] = [];
  private currentGeolocation: any;
  private geo: Observable<any>;
  private iconUrl: any;
  private currentSelectionIsPresent = false;
  selectedPlace: PlaceType;
  sideNavIsOpen: boolean;

	constructor(iconRegistry: MdIconRegistry,
							sanitizer: DomSanitizer, 
							private dialog: MdDialog, 
              private nearbySearchSvc: GooglePlacesNearbySearchService,
              private establishmentsSvc: EstablishmentsService,  
              private selectedPlaceTypeSvc: SelectedPlaceTypeService,
              private geoSvc: GeoLocationService,
              private gmapsApi: GoogleMapsAPIWrapper){
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');
    this.iconUrl = {greenDot:'./assets/green-dot.png', 
                    red:'./assets/red.png',
                    redDot:'./assets/red-dot.png'};

    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
    this.geo = geoSvc.getLocation();
    this.geo.subscribe(location => this.currentGeolocation = location);
    this.establishmentsSvc.getCurrentSelection().subscribe(selected => {
      this.currentSelectionIsPresent = true;
    })
    this.selectedPlaceTypeSvc.get().subscribe(place => { this.selectedPlace = place});
    this.sideNavIsOpen = true;
  }


  toggleSideNav(): boolean {
    return this.sideNavIsOpen = !this.sideNavIsOpen;
  }

  changePlaceType(type: string){
    console.log(type);
    this.toggleSideNav();
    this.getPlacesByType(type);
  }

  ngAfterViewInit() {
  }

  private openAdminDialog() {
		this.dialog.open(DialogComponent).afterClosed()
  }

  clickedMarker($event: any) {
    console.log('clicked marker', $event)
    this.establishmentsSvc.setCurrentSelection({place_id: $event});
  }

	mapClicked($event: MouseEvent) {
		console.log('click', $event);
  }

  mapChanged($event: MouseEvent) {
  }

  private promisedSearch(pos: any, placeType: string): Promise<any> {

    const bounds = new google.maps.LatLngBounds();
    const markers = [];

    const srch = new Promise((resolve, reject) => {

      this.nearbySearchSvc.searchRankedByDistance(pos, <PlaceType>placeType).toPromise().then( data => {
        data.forEach( ( result, i ) => {
          if (i < 10) bounds.extend(result.geometry.location);
          markers.push({iconUrl: this.iconUrl.red, label: '', place_id: result.place_id, lat: result.geometry.location.lat, lng: result.geometry.location.lng });
        }); // forEach

        resolve({bound: bounds, markers: markers});
      });
    });

    return srch;

  }

  private drawMarkers(markers: any[]): void {
    // TODO: filter markers
    /*
    this.markers.length = 0;
    this.markers = markers;
    */
  }

  private getPlacesByType(placeType: string): void{

    const position = this.currentGeolocation;
    const coords = position.coords;

    this.lat = coords.latitude;
    this.lng = coords.longitude;
    const pos = {lat: this.lat, lng: this.lng};

    this.nearbySearchSvc.someFunc(pos, <PlaceType>placeType).subscribe(data => {
      console.log('result of someFunc', data);
      const newMarkers = [];
      /*
      data.places.forEach( ( result, i ) => {
        newMarkers.push({iconUrl: this.iconUrl.red, label: '', place_id: result.place_id, lat: result.geometry.location.lat, lng: result.geometry.location.lng });
      }); // forEach
      */
      data.nearbyPlaces.forEach( ( result, i ) => {
        newMarkers.push({iconUrl: this.iconUrl.red, label: '', place_id: result.place_id, lat: result.geometry.location.lat, lng: result.geometry.location.lng });
      }); // forEach
      /*
      data.radarSearch.forEach( ( result, i ) => {
        newMarkers.push({iconUrl: this.iconUrl.redDot, label: '', place_id: result.place_id, lat: result.geometry.location.lat, lng: result.geometry.location.lng });
      }); // forEach
      */
      this.markers.length = 0;
      this.markers = newMarkers;
      this.markers.push({iconUrl: this.iconUrl.greenDot, lat: pos.lat, lng: pos.lng, draggable: false});
      this.latLngBounds = data.bounds;
    })
  }

	ngOnInit(): void {
      
      this.geoSvc.getLocation().toPromise().then(position => {
        const coords = position.coords;
        this.lat = coords.latitude;
        this.lng = coords.longitude;
        const pos = {lat: this.lat, lng: this.lng};

        this.promisedSearch(pos, 'cafe').then( result => {
          this.markers.length = 0;
          this.latLngBounds = result.bound;
          this.markers = result.markers;
          this.markers.push({iconUrl: this.iconUrl.greenDot, lat: pos.lat, lng: pos.lng, draggable: false});
        });
      }).catch(err => console.log(err));
  }


}
