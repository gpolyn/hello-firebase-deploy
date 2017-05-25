import { Injectable } from '@angular/core';
import { PlaceType } from '../index';
import {
  CanActivate, 
	Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route
} from '@angular/router';

@Injectable()
export class RandomTypeRedirectionService implements CanActivate {

	constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    const len = (<any>Object).keys(PlaceType).length;
    const randIdx = Math.floor(Math.random() * len); 
    let idx = 0;
    let type: string;

		for (let item in PlaceType) {
      if (idx == randIdx) {
        type = item;
        break;
      } else {
        idx++;
      }
		}

		// redirect
    const link = type.split('-').join('_');
    this.router.navigate(['/washington-dc', link]);
		return true;
  }

}
