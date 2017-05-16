import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {GooglePlacesService} from './google-places.service';
import {HourlyDataService} from './hourly-data.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EstablishmentsService {

  protected currentSelection: BehaviorSubject<any>;
  protected currentSelection$: Observable<any>;

  constructor(private placesSvc: GooglePlacesService,
              private hrlyDataSvc: HourlyDataService
  ){
    this.currentSelection = new BehaviorSubject({});
    this.currentSelection$ = this.currentSelection.asObservable();
  }

  setCurrentSelection(newSelection: any): void {
    console.log('setCurrentSelection', newSelection);
    this.placesSvc.getPlaceData(newSelection.place_id).toPromise().then(result=>{
      const hourlyData = this.hrlyDataSvc.extractHourlyData(result);
      const currentSelection = {...result, hourlyData: hourlyData};
      this.currentSelection.next(currentSelection);
    })
  }

  getCurrentSelection(): Observable<any> {
    return this.currentSelection$;
  }
  
}
