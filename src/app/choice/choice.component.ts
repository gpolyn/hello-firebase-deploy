import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'choice',
  host: {class: 'myClass'},
  styles: ['div {background-color: gray}', 'button {width: 80%}'],
  template: `
    <div fxLayoutAlign="space-around center" fxLayout="column" fxFlex> 
      <button md-raised-button>days of week</button>
      <button md-raised-button>days in future</button>
    </div>
  `
})
export class ChoiceComponent {

	constructor() { }

  ngAfterViewInit(): void { }

	ngOnInit(): void { }


}
