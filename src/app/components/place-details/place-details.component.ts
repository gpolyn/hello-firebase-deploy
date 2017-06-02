import {  Component, 
          OnInit, 
          ChangeDetectionStrategy,
          NgZone,
          ChangeDetectorRef
        } from '@angular/core';
import { EstablishmentsService } from '../../services';

@Component({
  selector: 'place-details',
  template: `
  <md-card fxFlex fxFlexFill>
    <md-card-title class='title-card-title'>{{place?.name}}</md-card-title>
    <md-card-subtitle fxLayout="row" fxLayoutAlign="space-between center" class='title-card-subtitle'>
      <div style="float:left">
        <star-rating [rating]="place?.rating"></star-rating>
      </div>
      <div style="float:right">
        {{place?.formatted_phone_number}}
      </div>
    </md-card-subtitle>
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
        console.log('place', place.types[0]);
        this.place = place; 
      });
    });
  }

}
