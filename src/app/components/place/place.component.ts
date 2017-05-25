import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-place',
  template: `
    <div fxLayout="column" fxLayoutAlign="stretch">
      <swipe fxFlex="50"></swipe>
      <place-details></place-details>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
