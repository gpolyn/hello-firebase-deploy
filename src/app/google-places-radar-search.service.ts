import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {environment} from '../environments/environment'

@Injectable()
export class GooglePlacesRadarSearchService {

  private apiKey: string;
  private selection: any;

  constructor(private http: Http) {
    this.apiKey = environment.google_maps_api_key;
  }

  search(latLng: any, type: string, radius: number = 50000): Observable<any> {
		return this.http.get(this.requestString(latLng, type, radius))
								.map(this.extractData)
								.catch(this.handleError);
  }

  private requestString(latLng: any, type: string, radius: number): string {
    const str = `https://maps.googleapis.com/maps/api/place/radarsearch/json?location=${latLng.lat},${latLng.lng}&radius=${radius}&type=${type}&key=${this.apiKey}`;
    console.log('GooglePlacesRadarSearchService#requestString', str);
    return str;
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log('result', body);
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
