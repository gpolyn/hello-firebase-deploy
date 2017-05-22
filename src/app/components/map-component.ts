import { Component } from '@angular/core';

@Component({
  selector: 'map',
  styles: [`
      background-color: pink;    
      width:100%;
      height:100%;
  `],
  template: `
    <sebm-google-map  #agmMap (boundsChange)="mapChanged($event)" fxFlex="{{mapHeightPercentage}}" [latitude]="lat" [longitude]="lng" [fitBounds]="latLngBounds">
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
  `
})
export class MapComponent {

  mapChanged($event: MouseEvent) {
    console.log("boundsChange", $event);
  }

}
