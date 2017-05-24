import { Injectable, Inject, forwardRef } from '@angular/core';
import { EstablishmentsService } from '../../establishments.service';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class PlaceDetailsResolverService implements Resolve<any> {

  constructor(
    @Inject(forwardRef(() => EstablishmentsService)) private establishmentsSvc: EstablishmentsService,
		private router: Router
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const id = route.params['place-id'];
    console.log('id', id)
    this.establishmentsSvc.setCurrentSelection({place_id: id});
		return null;
  }

}
