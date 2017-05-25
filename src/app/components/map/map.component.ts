import {  Component, 
          OnInit, 
          ChangeDetectionStrategy,
          ViewChild,
          NgZone,
          ChangeDetectorRef
        } from '@angular/core';
import { AppConfig, APP_CONFIG } from '../../config';
import { SebmGoogleMap } from 'angular2-google-maps/core';
import { MapParametersService } from '../../services';
import { GeoLocationService } from '../../geolocation.service';
import { GooglePlacesNearbySearchService } from '../../google-places-nearby-search.service';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { EstablishmentsService } from '../../establishments.service';
import { SelectedPlaceTypeService } from '../../selected-place-type.service';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
declare var google: any;

@Component({
  selector: 'map',
  styles: [`
    :host { 
      background:color: pink;
      width:100%; 
      height:100%;
    }
  `],
  template: `
    <sebm-google-map #agmMap [zoom]="zoom" (boundsChange)="boundsChange($event)" fxFlexFill [latitude]="lat" [longitude]="lng">
      <sebm-google-map-marker 
        *ngFor="let m of markers"
        [label]="m.label"                       
        (markerClick)="clickedMarker(m)"
        [latitude]="m.lat"
        [iconUrl]="m.iconUrl"
        [longitude]="m.lng"
        [markerDraggable]="m.draggable" >
      </sebm-google-map-marker> 
      <sebm-google-map-marker 
        *ngIf="currentGeolocationMarker"
        [label]="currentGeolocationMarker.label"                       
        (markerClick)="clickedMarker(currentGeolocationMarker)"
        [latitude]="currentGeolocationMarker.lat"
        [iconUrl]="currentGeolocationMarker.iconUrl"
        [longitude]="currentGeolocationMarker.lng"
        [markerDraggable]="currentGeolocationMarker.draggable" >
      </sebm-google-map-marker> 
    </sebm-google-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {

  markers: any[];
  currentGeolocationMarker: any;
  private iconUrl: any;
  lat: number = 51.678418;
  lng: number = 7.809007;
  latLngBounds: any;
  zoom: number = 18;
  mapHeightPercentage: number;
  bounds$: Subject<any>;
  private bounds: any;
  private placesService: any;
  private type: any;
	@ViewChild(SebmGoogleMap)
  private map: SebmGoogleMap;

  constructor(
    private ngZone: NgZone,
    private ref: ChangeDetectorRef,
    private selectedTypeSvc: SelectedPlaceTypeService,
    private geoSvc: GeoLocationService,
    private router: Router,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private mapParamsSvc: MapParametersService
  ) {
    this.markers = [];
    this.bounds$ = new Subject<any>();
    this.iconUrl = {greenDot:'./assets/green-dot.png', 
                    red:'./assets/red.png',
                    redDot:'./assets/red-dot.png'};
    this.mapHeightPercentage = 40;

    this.selectedTypeSvc.get().subscribe(type => { 
      this.type = type;
      this.otherFunc(this.bounds);
    });
  }

  clickedMarker(marker: any) {
    console.log('clicked marker', marker);
    // this.establishmentsSvc.setCurrentSelection(marker);
    this.router.navigate(['places', marker.place_id, {lat: marker.lat, lng: marker.lng}]);
  }

  private otherFunc(newBounds: any) {
    if (this.type === undefined) {
      return;
    } 
    const request = {
      bounds: newBounds,
      type: [this.type]
    }

    const promisedSearch = new Promise(( resolve, reject) => {
      // you may need to make this available as a service, because it won't work at first
      this.placesService.nearbySearch(request, results => {
        const placeMarkers = results.map( place => {
          return {
            place_id: place.place_id,
            lat: place.geometry.location.lat(), 
            lng: place.geometry.location.lng(), 
            draggable: false
          };
        });
        resolve(placeMarkers);
      });
    });

    promisedSearch.then( results => {
      this.ngZone.run(() => {
        this.ref.markForCheck();
        this.markers = (<any>Object).values(results);
      });
    });

  }

  ngOnInit() {
    this.geoSvc.getLocation().subscribe(position => {
      this.ngZone.run(() => {
        this.ref.markForCheck();
        const coords = position.coords;
        this.lat = coords.latitude;
        this.lng = coords.longitude;
        this.addCurrentLocationMarker({lat: this.lat, lng: this.lng});
        this.zoom = 12;
      });
    });

    this.mapsAPILoader.load().then(() => {
      const container = document.createElement('div');
      this.placesService = new google.maps.places.PlacesService(container);
      this.bounds$.debounceTime(300)
                 .distinctUntilChanged()
                 .subscribe( newBounds => {
                    this.otherFunc(newBounds);
                 });

    });

  }

  boundsChange($event: MouseEvent) {
    this.bounds = $event;
    this.bounds$.next($event);
  }

  private addPlacesMarkers(places: any[]): void {
    const currentMarker = this.markers.find( marker => {
      return ( marker.iconUrl === this.iconUrl.greenDot );
    })
  }

  private addCurrentLocationMarker(pos: any): void {

    const geoMarker = {
      iconUrl: this.iconUrl.greenDot, 
      lat: pos.lat, 
      lng: pos.lng, 
      draggable: false
    };

    this.currentGeolocationMarker = geoMarker;
  }
  
  private updateMap(){
    this.map.triggerResize().then(result => {
      console.log("triggered resize")
    });
  }

}
