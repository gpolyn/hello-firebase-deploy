import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { DOCUMENT } from '@angular/platform-browser';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {environment} from '../index';
declare var google: any;

@Injectable()
export class GooglePlacesService {

  private apiKey: string;
  private selection: any;
  private _jsPlacesService: any; 
  private promisedPlacesService: Promise<any>;
  private container: any;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private mapsAPILoader: MapsAPILoader,
    private http: Http) {
    this.apiKey = environment.google_maps_api_key;
    // this.container = this.document.createElement('div');
    this.jsPlacesService().then( svc => { this._jsPlacesService = svc;});
  }

  private jsPlacesService(): Promise<any> {
    if (this._jsPlacesService === undefined) {
      const prom = this.mapsAPILoader.load().then(() => {
      //const container = this.document.createElement('div');
        const container = document.createElement('div');
        const placesService = new google.maps.places.PlacesService(container);
        return Promise.resolve(placesService);
      });
      return prom;
    } else {
      return Promise.resolve(this._jsPlacesService);
    }
  }

  getPlaceData(placeId: string): Observable<any> {
    // return this.webServiceMode(placeId);
    const request = {placeId: placeId};
    const prom = this.jsPlacesService().then( svc => {
      return new Promise((resolve, reject) => {
        svc.getDetails(request, (result) => {
          const lat = result.geometry.location.lat();
          const lng = result.geometry.location.lng();
          result.geometry.location.lat = lat;
          result.geometry.location.lng = lng;
          resolve(result);
        });
      });
    });
    return Observable.fromPromise(prom);
  }

  private webServiceMode(placeId: string): Observable<any> {
		return this.http.get(this.requestString(placeId))
								.map(this.extractData)
								.catch(this.handleError);
  }

  private requestString(placeId: string): string {
    return `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${this.apiKey}`
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.result || { };
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
