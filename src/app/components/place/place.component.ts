import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place',
  template: `
    <div style='margin-top: 6px' fxLayout="column" fxLayoutGap="6px" fxLayoutAlign="stretch">
      <swipe fxFlex="50"></swipe>
      <place-details></place-details>
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
