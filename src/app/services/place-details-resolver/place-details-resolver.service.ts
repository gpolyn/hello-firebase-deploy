import { Injectable, Inject, forwardRef } from '@angular/core';
import { EstablishmentsService } from '../../establishments.service';
import { SelectedPlaceTypeService } from '../index';
import { MapParametersService } from '../map/map.service';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class PlaceDetailsResolverService implements Resolve<any> {

  constructor(
    @Inject(forwardRef(() => MapParametersService)) private mapParamsSvc: MapParametersService,
		@Inject(forwardRef(() => SelectedPlaceTypeService)) private placeTypeService: SelectedPlaceTypeService,
    @Inject(forwardRef(() => EstablishmentsService)) private establishmentsSvc: EstablishmentsService,
		private router: Router
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
  //console.log('route.params', route.queryParams);
    // console.log('route.state', state);
    // console.log('type is set', this.selectedPlaceTypeSvc.hasType);
    const id = route.params['place-id'];
    const lat = +route.queryParams['lat'];
    const lng = +route.queryParams['lng'];
    // console.log({lat: lat, lng: lng});
    this.mapParamsSvc.set({lat: lat, lng: lng, refreshMap: true});
    this.establishmentsSvc.setCurrentSelection({place_id: id});
		return null;
  }

}
