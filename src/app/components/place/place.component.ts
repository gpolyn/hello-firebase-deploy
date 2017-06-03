import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place',
  host: {class: 'myClass'},
  template: `
    <!-- <div style='margin-top: 6px' fxLayout="column" fxLayoutGap="6px" fxLayoutAlign="stretch"> -->
    <div style='margin-top: 6px' fxLayoutGap="6px" fxFlex fxLayout="column">
      <!-- <swipe fxLayoutAlign="stretch" fxFlex="65%"></swipe> -->
      <swipe fxLayoutAlign="stretch" fxFlex></swipe>
      <place-details fxFlex="35%"></place-details>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.route.params.map(parms => parms['lat']).subscribe( lat => console.log({lat: lat}));
  }

}
