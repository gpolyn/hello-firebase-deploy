import { ElementRef, ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
import {MdIconRegistry, MdDialog, MdDialogRef} from '@angular/material';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {DomSanitizer} from '@angular/platform-browser';
import { DialogComponent } from './components';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { SebmGoogleMap } from 'angular2-google-maps/core';
import { MapParametersService } from './services';
import { SelectedPlaceTypeService } from './services';
import {GeolocationService} from './services';
import { Observable } from 'rxjs/Observable';
import {GooglePlacesNearbySearchService} from './google-places-nearby-search.service';
import {PlaceType} from './place-types';
declare var google: any;

@Component({
  selector: 'app-root',
	providers: [GoogleMapsAPIWrapper],
  templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
	@ViewChild('agmMap') ag: any;
	@ViewChild(SebmGoogleMap)
  private map: SebmGoogleMap;
  placeType = PlaceType;
  latLngBounds: any;
  mapHeightPercentage: number = 40;
  mapParams: any;
  //  lat: number = 51.678418;
  // lng: number = 7.809007;
  lat: number;
  lng: number;
  panToSelection: boolean = false;
  isDarkTheme = false;
  geoPos: any;
	markers: any[] = [];
  private currentGeolocation: any;
  private geo: Observable<any>;
  private iconUrl: any;
  private currentSelectionIsPresent = false;
  selectedPlace: PlaceType;
  sideNavIsOpen: boolean = false;

	constructor(iconRegistry: MdIconRegistry,
							sanitizer: DomSanitizer, 
							private dialog: MdDialog, 
              private nearbySearchSvc: GooglePlacesNearbySearchService,
              private mapParamsSvc: MapParametersService,
              private selectedPlaceTypeSvc: SelectedPlaceTypeService,
              private router: Router,
              private geoSvc: GeolocationService){
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');
    this.iconUrl = {greenDot:'./assets/green-dot.png', 
                    red:'./assets/red.png',
                    redDot:'./assets/red-dot.png'};

    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
    /*
    this.geo = geoSvc.getLocation();
    this.geo.subscribe(location => this.currentGeolocation = location);
    */
    this.selectedPlaceTypeSvc.get().subscribe(place => { this.selectedPlace = place});
    mapParamsSvc.get().subscribe(mapParams => {
      this.mapParams = mapParams;
      this.lat = mapParams.lat;
      this.lng = mapParams.lng;
    })
  }


  toggleSideNav(): boolean {
    return this.sideNavIsOpen = !this.sideNavIsOpen;
  }

  changePlaceType(type: string){
    this.toggleSideNav();
    this.getPlacesByType(type);
  }

  ngAfterViewInit() {
    this.panToSelection = true;
    // this.openAdminDialog();
    //this.openPlaceTypeChoicePrompt();
  }

  private openPlaceTypeChoicePrompt() {
		this.dialog.open(DialogComponent).afterClosed()
  }

  clickedMarker($event: any) {
    console.log('clicked marker', $event)
    this.toggleSideNav();
  }

	mapClicked($event: MouseEvent) {
		console.log('click', $event);
  }

  mapChanged($event: MouseEvent) {
    console.log("boundsChange", $event);
  }

  private promisedSearch(pos: any, placeType: string): Promise<any> {

    const bounds = new google.maps.LatLngBounds();
    const markers = [];

    const srch = new Promise((resolve, reject) => {

      this.nearbySearchSvc.searchRankedByDistance(pos, <PlaceType>placeType).toPromise().then( data => {
        data.forEach( ( result, i ) => {
          if (i < 10) bounds.extend(result.geometry.location);
          markers.push({name:result.name, iconUrl: this.iconUrl.red, label: '', place_id: result.place_id, lat: result.geometry.location.lat, lng: result.geometry.location.lng });
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
      data.nearbyPlaces.forEach( ( result, i ) => {
        newMarkers.push({name: result.name, iconUrl: this.iconUrl.red, label: '', place_id: result.place_id, lat: result.geometry.location.lat, lng: result.geometry.location.lng });
      }); // forEach
      this.markers.length = 0;
      this.markers = newMarkers;
      this.markers.push({iconUrl: this.iconUrl.greenDot, lat: pos.lat, lng: pos.lng, draggable: false});
      this.latLngBounds = data.bounds;
    })
  }

	ngOnInit(): void {

      /*  
      this.geoSvc.getLocation().toPromise().then(position => {
        const coords = position.coords;
        this.lat = coords.latitude;
        this.lng = coords.longitude;
        const pos = {lat: this.lat, lng: this.lng};
      }).catch(err => console.log(err));
      */
  }



  handleOpen(data: any) {
    console.log('map opened!', data);
  }

  updateMap(){
    console.log('updateMap', this.mapParams);
      /*
    this.map.triggerResize().then(result => {
      console.log('geolocation', this.currentGeolocation)
      if (this.mapParams){
        this.lat = this.mapParams.lat;
        this.lng = this.mapParams.lng;
      } else {
        this.lat = this.currentGeolocation.coords.latitude;
        this.lng = this.currentGeolocation.coords.longitude;
      }
    });
      */
  }


}
