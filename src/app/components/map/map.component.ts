import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppConfig, APP_CONFIG } from '../../config';
import { MapParametersService } from '../../services';

@Component({
  selector: 'map',
  styles: [`
      background-color: pink;    
      width:100%;
      height:100%;
  `],
  template: `
    <sebm-google-map  #agmMap (boundsChange)="boundsChange($event)" fxFlex="{{mapHeightPercentage}}" [latitude]="lat" [longitude]="lng" [fitBounds]="latLngBounds">
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
  lat: number;
  lng: number;
  latLngBounds: any;
  mapHeightPercentage: number;

  constructor(
    private mapParamsSvc: MapParametersService
  ) {
    this.markers = [];
    this.mapHeightPercentage = 40;
    mapParamsSvc.get().subscribe(params => {
      console.log('mapParams', params);
      this.lat = params.lat;
      this.lng = params.lng;
    })
  }

  ngOnInit() {
  }

  boundsChange($event: MouseEvent) {
    console.log("boundsChange", $event);
  }

}
