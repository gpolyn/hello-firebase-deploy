import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { PlaceType } from '../index';
import { SelectedPlaceTypeService } from '../../selected-place-type.service';

@Injectable()
export class PlaceTypeResolverService implements Resolve<any> {

  constructor(
		private placeTypeService: SelectedPlaceTypeService,
		private router: Router
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let type = route.params['place-type'];
    const alt = type.split('-').join('_');
    console.log('enum', PlaceType[alt]);
		this.placeTypeService.set(PlaceType[alt]);
		return null;
  }

}
