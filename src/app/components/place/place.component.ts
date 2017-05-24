import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-place',
  template: `
    <place-details></place-details>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
