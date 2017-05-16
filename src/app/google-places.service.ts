import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {environment} from '../environments/environment'

@Injectable()
export class GooglePlacesService {

  private apiKey: string;
  private selection: any;

  constructor(private http: Http) {
    this.apiKey = environment.google_maps_api_key;
  }

  getPlaceData(placeId: string): Observable<any> {
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
