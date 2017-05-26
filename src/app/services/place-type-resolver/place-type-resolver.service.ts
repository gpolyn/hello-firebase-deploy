import { Injectable } from '@angular/core';
import { MapParametersService } from '../map/map.service';
import { Router, Resolve, RouterStateSnapshot,
         NavigationEnd, 
         ActivatedRouteSnapshot } from '@angular/router';
import { PlaceType } from '../index';
import { SelectedPlaceTypeService } from '../../selected-place-type.service';

@Injectable()
export class PlaceTypeResolverService implements Resolve<any> {

  constructor(
		private placeTypeService: SelectedPlaceTypeService,
    private mapParamsSvc: MapParametersService,
		private router: Router
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let type = route.params['place-type'];
    console.log('touter events', this.router.events);
    const alt = type.split('-').join('_');
    console.log('enum', PlaceType[alt]);
    this.mapParamsSvc.set({refreshMap: true});
		this.placeTypeService.set(PlaceType[alt]);
		return null;
  }

}
