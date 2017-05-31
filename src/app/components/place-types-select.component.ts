import { Component } from '@angular/core';
import { PlaceType } from '../place-types';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SelectedPlaceTypeService } from '../services';

@Component({
  selector: 'place-types-select',
  template: `
		<md-select [(ngModel)]="selectedType" (ngModelChange)='handleChange()'name="business-category">
			<md-option *ngFor="let placeType of PLACE_TYPES" [value]="placeType">
				{{placeType}}
			</md-option>
		</md-select>
  `
})
export class PlaceTypesSelectComponent {

  readonly PLACE_TYPES = [
    PlaceType.bakery,
    PlaceType.bar,
    PlaceType.cafe,
    PlaceType.florist,
    PlaceType.meal_takeaway,
    PlaceType.meal_delivery,
    PlaceType.restaurant,
    PlaceType.store,
  ];

  private selectedType: PlaceType;

  constructor(
      private selectedPlaceTypeSvc: SelectedPlaceTypeService,
      private router: Router
    ){
    this.selectedPlaceTypeSvc.get().subscribe(placeType => {
      this.selectedType = placeType; 
    });
  }

  handleChange(){
    console.log("handleChange", this.selectedType);
    this.nav(this.selectedType);
  }

  nav(placeType: PlaceType): void {
    const link = placeType.split(' ').join('-');
    this.router.navigate(['/washington-dc', link]);
  }

}
