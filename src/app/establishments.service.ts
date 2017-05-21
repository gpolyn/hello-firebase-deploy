import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {GooglePlacesService} from './google-places.service';
import {MapParametersService} from './map-parameters.service';
import {HourlyDataService} from './hourly-data.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EstablishmentsService {

  private subject = new Subject<any>();

  constructor(private placesSvc: GooglePlacesService,
              private mapParamsSvc: MapParametersService,
              private hrlyDataSvc: HourlyDataService
  ){ }

  setCurrentSelection(newSelection: any): void {
    console.log('setCurrentSelection', newSelection);
    this.mapParamsSvc.set(newSelection);
    this.placesSvc.getPlaceData(newSelection.place_id).toPromise().then(result=>{
      const hourlyData = this.hrlyDataSvc.extractHourlyData(result);
      const currentSelection = {...result, hourlyData: hourlyData};
      this.subject.next(currentSelection);
    })
  }

  getCurrentSelection(): Observable<any> {
    return this.subject.asObservable();
  }
  
}
