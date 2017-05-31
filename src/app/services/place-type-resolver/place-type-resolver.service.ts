import { Injectable, Inject, forwardRef } from '@angular/core';
import { MapParametersService } from '../map/map.service';
import { Router, Resolve, RouterStateSnapshot,
         NavigationEnd, 
         ActivatedRouteSnapshot } from '@angular/router';
import { PlaceType } from '../index';
import { SelectedPlaceTypeService } from '../index';
import { GeolocationService } from '../index';

@Injectable()
export class PlaceTypeResolverService implements Resolve<any> {

  constructor(
		@Inject(forwardRef(() => SelectedPlaceTypeService)) private placeTypeService: SelectedPlaceTypeService,
    @Inject(forwardRef(() => MapParametersService)) private mapParamsSvc: MapParametersService,
		@Inject(forwardRef(() => GeolocationService)) private geoLocationSvc: GeolocationService,
		private router: Router
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let type = route.params['place-type'];
    //console.log("has location?", this.geoLocationSvc.hasLocation);
		const alt = type.split('-').join('_');
		this.mapParamsSvc.set({refreshMap: true});
		this.placeTypeService.set(PlaceType[alt]);

		if (!this.geoLocationSvc.hasLocation) {

			this.geoLocationSvc.getLocation().toPromise().then((position)=>{
		 		console.log('GOT THE POSITION', position.coords);
				const params = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
					zoom: this.mapParamsSvc.DEFAULT_ZOOM
				};
				this.mapParamsSvc.set(params);
			});

		} else {
			return null;
		}
    /*
    console.log('PlaceTypeResolverService events', this.router.events);
    console.log('PlaceTypeResolverService state', state);
    */
  }

}
