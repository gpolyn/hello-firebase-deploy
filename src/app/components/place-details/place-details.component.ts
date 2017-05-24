import {  Component, 
          OnInit, 
          ChangeDetectionStrategy,
          NgZone,
          ChangeDetectorRef
        } from '@angular/core';
import { EstablishmentsService } from '../../establishments.service';

@Component({
  selector: 'place-details',
  template: `
  <md-card>
    <md-card-title class='title-card-title'>{{place?.name}}</md-card-title>
    <md-card-content class='title-card-subtitle'>
      <div style="float:left">
        <md-icon>star</md-icon>
        <md-icon>star_half</md-icon>
        <md-icon>star_border</md-icon>
      </div>
      <div style="float:right">
        {{place?.formatted_phone_number}}
      </div>
    </md-card-content>
  </md-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceDetailsComponent implements OnInit {

  place: any;

  constructor( 
    private ngZone: NgZone,
    private ref: ChangeDetectorRef,
    private establishmentsSvc: EstablishmentsService) { }

  ngOnInit() {
    this.establishmentsSvc.getCurrentSelection().subscribe( place => { 
      this.ngZone.run(() => {
        this.ref.markForCheck();
        console.log('place details', place)
        this.place = place; 
      });
    });
  }

}
