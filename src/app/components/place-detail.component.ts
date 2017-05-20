import { Component } from '@angular/core';
import { EstablishmentsService } from '../establishments.service';

@Component({
  selector: 'place-detail',
	styles: ['{background-color: #fafafa}'],
  template: `
		<footer *ngIf="placeIsSelected">
			<md-toolbar class="md-scroll-shrink">
				<span class='mat-card-title'>{{place.name}}</span>
				<md-toolbar-row class="mat-card-subtitle">
					{{place.rating}}
				</md-toolbar-row>
			</md-toolbar>
		</footer>
  `
})
export class PlaceDetailComponent {

	private place: any = {};
	private placeIsSelected = false;

	constructor(private establishmentsSvc: EstablishmentsService) {
    this.establishmentsSvc.getCurrentSelection().subscribe(selection => {
			this.placeIsSelected = true;
			this.place = selection
    });
	}

}
