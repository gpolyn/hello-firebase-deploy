import {  Component, 
          OnInit, 
          ChangeDetectionStrategy,
          NgZone,
          ChangeDetectorRef
        } from '@angular/core';
import { AppConfig, APP_CONFIG } from '../../config';
import { MapParametersService } from '../../services';
import {GeoLocationService} from '../../geolocation.service';

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
    <sebm-google-map #agmMap (boundsChange)="boundsChange($event)" fxFlexFill [latitude]="lat" [longitude]="lng">
      <sebm-google-map-marker 
        *ngFor="let m of markers"
        [label]="m.label"                       
        (markerClick)="clickedMarker(m)"
        [latitude]="m.lat"
        [iconUrl]="m.iconUrl"
        [longitude]="m.lng"
        [markerDraggable]="m.draggable" >
      </sebm-google-map-marker> 
    </sebm-google-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {

  markers: any[];
  //lat: number;
  //lng: number;
  lat: number = 51.678418;
  lng: number = 7.809007;
  latLngBounds: any;
  mapHeightPercentage: number;

  constructor(
    private ngZone: NgZone,
    private ref: ChangeDetectorRef,
    private geoSvc: GeoLocationService,
    private mapParamsSvc: MapParametersService
  ) {
    this.markers = [];
    this.mapHeightPercentage = 40;
    mapParamsSvc.get().subscribe(params => {
      console.log('mapParams', params);
      this.lat = params.lat;
      this.lng = params.lng;
    })
    /*
    this.geoSvc.getLocation().toPromise().then(position => {
      console.log('crap', position)
      const coords = position.coords;
      this.lat = coords.latitude;
      this.lng = coords.longitude;
    });
    */
  }

  ngOnInit() {
      this.geoSvc.getLocation().subscribe(position => {
      //this.geoSvc.getLocation().toPromise().then(position => {
        this.ngZone.run(() => {
          this.ref.markForCheck();
          console.log('position', position);
          const coords = position.coords;
          this.lat = coords.latitude;
          this.lng = coords.longitude;
        });

        /*
        const pos = {lat: this.lat, lng: this.lng};
        this.promisedSearch(pos, 'cafe').then( result => {
          this.markers.length = 0;
          this.latLngBounds = result.bound;
          this.markers = result.markers;
          this.markers.push({iconUrl: this.iconUrl.greenDot, lat: pos.lat, lng: pos.lng, draggable: false});
        });
        */
      });
      // }).catch(err => console.log(err));
  }

  boundsChange($event: MouseEvent) {
    console.log("boundsChange", $event);
  }

}
