import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { PlaceType } from './place-types';
import { SelectedPlaceTypeService } from './services';
declare var google: any;

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {environment} from '../environments/environment'
import { GooglePlacesRadarSearchService } from './google-places-radar-search.service';

@Injectable()
export class GooglePlacesNearbySearchService {

  private apiKey: string;
  private selection: any;
  private results: any[];
  private requestParams: any;
  private bh: BehaviorSubject<any[]>;
  private data: Observable<any[]>;

              
  constructor(private selectedPlaceSvc: SelectedPlaceTypeService, private http: Http, private radarSearchSvc: GooglePlacesRadarSearchService) {
    this.apiKey = environment.google_maps_api_key;
    this.bh = new BehaviorSubject<any[]>([]);
    this.data = this.bh.asObservable();
  }

  searchRankedByDistance(latLng: any, type: PlaceType): Observable<any> {
    this.selectedPlaceSvc.set(type);
    this.searchForMoreResults(latLng, type);
    this.data = this.http.get(this.requestString(latLng, type))
								.map(this.extractData)
								.catch(this.handleError);
    return this.data;
  }

  someFunc(latLng: any, type: PlaceType): Observable<any> {
    this.selectedPlaceSvc.set(type);
    const bounds = new google.maps.LatLngBounds();
    //return Observable.concat(
    return Observable.combineLatest(
      this.http.get(this.requestString(latLng, type))
                .map(this.extractData)
                .catch(this.handleError),
      this.radarSearchSvc.search(latLng, type)
      ).map(result => {
        result[0].forEach( ( datum, i) => {
          if (i < 10) {
            bounds.extend(datum.geometry.location);
          }
        })  
        const obj = {bounds: bounds, places: result[0].concat(result[1])};
        obj['nearbyPlaces'] = result[0];
        obj['radarSearch'] = result[1];
        return obj;
      });
  }

  private searchForMoreResults(latLng: any, type: string) {
    this.radarSearchSvc.search(latLng, type).toPromise().then(searchResults => {
      console.log('radar', searchResults);
      this.results = searchResults;
      // this.data.next(searchResults);
    });
  }

  getCompleteData(): any[]{
    return this.results;
  }

  private requestString(latLng: any, type: string): string {
    const str = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLng.lat},${latLng.lng}&rankby=distance&type=${type}&key=${this.apiKey}`;
    return str;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.results || { };
  }

  private handleError (error: Response | any) {
    // In the final app, I might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
