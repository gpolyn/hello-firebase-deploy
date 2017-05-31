import {  Component, 
          OnInit, 
          ChangeDetectionStrategy,
          ViewChild,
          NgZone,
          ChangeDetectorRef
        } from '@angular/core';
import { AppConfig, APP_CONFIG } from '../../config';
import { SebmGoogleMap } from 'angular2-google-maps/core';
import { MapParametersService, SelectedPlaceTypeService } from '../../services';
import { GeolocationService } from '../../services';
import { Observable } from 'rxjs/Observable';
import { GooglePlacesNearbySearchService } from '../../google-places-nearby-search.service';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { EstablishmentsService } from '../../establishments.service';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
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
    <div fxLayoutAlign="space-around center" fxFlexFill *ngIf="isSpinning">
      <md-spinner color="accent" fxFlex></md-spinner>
    </div>
    <sebm-google-map *ngIf="!isSpinning" #agmMap [zoom]="zoom" [usePanning]="usePanning" (boundsChange)="boundsChange($event)" fxFlexFill [latitude]="lat" [longitude]="lng">
      <sebm-google-map-marker 
        *ngIf="selectedMarker"
        [latitude]="selectedMarker.lat"
        [zIndex]="9"
        [iconUrl]="iconUrl.blueDot"
        [longitude]="selectedMarker.lng"
        [markerDraggable]="false" >
      </sebm-google-map-marker> 
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
        [zIndex]="10"
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
  selectedMarker: any;
  mapHeightPercentage: number;
  bounds$: Subject<any>;
  private bounds: any;
  private placesService: any;
  private type: any;
	@ViewChild(SebmGoogleMap)
  private map: SebmGoogleMap;
  usePanning: boolean;
  private currentGeoLocation: any;
  public isSpinning: boolean = true;

  constructor(
    private ngZone: NgZone,
    private ref: ChangeDetectorRef,
    private selectedTypeSvc: SelectedPlaceTypeService,
    private geoSvc: GeolocationService,
    private router: Router,
    private establishmentsSvc: EstablishmentsService,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private mapParamsSvc: MapParametersService
  ) {
    this.markers = [];
    this.bounds$ = new Subject<any>();
    this.iconUrl = {greenDot:'./assets/green-dot.png', 
                    red:'./assets/red.png',
                    blueDot:'./assets/blue-dot.png',
                    redDot:'./assets/red-dot.png'};
    this.mapHeightPercentage = 40;

    this.selectedTypeSvc.get().subscribe(type => { 
      this.type = type;
      this.otherFunc(this.bounds);
    });
    this.usePanning = true;
  }

  clickedMarker(marker: any) {
    console.log('clicked marker', marker);
    this.ngZone.run(() => {
      this.ref.markForCheck();
      this.selectedMarker = marker;
    });
    // this.establishmentsSvc.setCurrentSelection(marker);
    const navigationExtras: NavigationExtras = {
      queryParams: { 'lat': marker.lat, 'lng': marker.lng }
      };
    this.router.navigate(['places', marker.place_id], navigationExtras);
  }

  private otherFunc(newBounds: any) {
  console.log("otherFunc", {lat: this.lat, lng: this.lng, bounds: newBounds});
    if (this.type === undefined || this.isSpinning) {
      console.log("about to quit out otherfunc")
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
            draggable: false, ...place
          };
        });
        resolve(placeMarkers);
      });
    });

    promisedSearch.then( results => {
      this.ngZone.run(() => {
        this.ref.markForCheck();
        console.log('redrawing markers');
        if (this.selectedMarker){
          this.markers = (<any>Object).values(results)
              .filter(marker => {
                return marker.place_id !== this.selectedMarker.place_id;
              })
              .map(item => {
                item.iconUrl = this.iconUrl.red;
                return item;
              });
        } else {
          this.markers = (<any>Object).values(results).map(item => {
            item.iconUrl = this.iconUrl.red;
            return item;
          });
        }
      });
    });

  }

  ngOnInit() {
    console.log('ngOnInit');
    this.geoSvc.getLocation().subscribe(position => {
      console.log('get geoLocation');
      this.currentGeoLocation = position.coords;
      this.ngZone.run(() => {
        this.ref.markForCheck();
        this.isSpinning = false;
        this.addCurrentLocationMarker();
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

    this.mapParamsSvc.get().subscribe( params => {
      this.usePanning = true;
      console.log('map component on mapParamsSvc ', params);
      if (params.refreshMap){
        if (this.map) {
          this.map.triggerResize().then( result => {
            this.ngZone.run(() => {
              this.ref.markForCheck();
              if (params.lat) this.lat = params.lat;
              if (params.lng) this.lng = params.lng;
            });
          });
        } else {
          if (params.lat) this.lat = params.lat;
          if (params.lng) this.lng = params.lng;
        }
      } else {
          this.ngZone.run(() => {
            this.ref.markForCheck();
            if (params.lat) this.lat = params.lat;
            if (params.lng) this.lng = params.lng;
            if (params.zoom) this.zoom = params.zoom;
          });
      }
    });

    this.establishmentsSvc.getCurrentSelection().take(1).subscribe( selected => {
      console.log('selected location', selected);
      this.selectedMarker = {
        lat: selected.geometry.location.lat,
        lng: selected.geometry.location.lng,
        ...selected
        }
    });

  }

  boundsChange($event: MouseEvent) {
    this.bounds = $event;
    console.log('boundsChange', {isSpinning: this.isSpinning, bounds: $event, lat: this.lat, lng: this.lng});
    this.bounds$.next($event);
  }

  private addPlacesMarkers(places: any[]): void {
    const currentMarker = this.markers.find( marker => {
      return ( marker.iconUrl === this.iconUrl.greenDot );
    })
  }

  private addCurrentLocationMarker(): void {
    if (this.currentGeoLocation === undefined) return;

    const pos = {
      lat: this.currentGeoLocation.latitude,
      lng: this.currentGeoLocation.longitude
    };

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
