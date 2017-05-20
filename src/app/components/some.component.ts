import { Component } from '@angular/core';

@Component({
  selector: 'some-component',
  template: `
    <div>
      <span>some component</span>
      <router-outlet></router-outlet>
    </div>
  `
})
export class SomeComponent {

}
