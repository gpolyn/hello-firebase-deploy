import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PlaceType } from '../index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SelectedPlaceTypeService } from '../../services';

@Component({
  selector: 'place-types-menu',
  template: `
    <button
      md-menu-item 
      *ngFor="let placeType of PLACE_TYPES"
      [class.active]="isSelected(placeType)" 
      (click)="nav(placeType)">
      {{placeType}}
    </button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceTypesMenuComponent {

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

  isSelected(placeType: PlaceType): boolean {
    return this.selectedType === placeType;
  }

  nav(placeType: PlaceType): void {
    console.log('nav', placeType.split(' ').join('-'))
    const link = placeType.split(' ').join('-');
    const alt = placeType.split(' ').join('_');
    console.log('enum', PlaceType[alt]);
    this.selectedPlaceTypeSvc.set(placeType);
    this.router.navigate(['/types', link]);
  }

}
