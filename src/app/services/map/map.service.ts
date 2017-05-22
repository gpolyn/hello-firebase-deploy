import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AppConfig, APP_CONFIG } from '../index';
import { MapParams } from './map-params';

@Injectable()
export class MapParametersService {

  private subject = new Subject<MapParams>();

  constructor(
      @Inject(APP_CONFIG) config: AppConfig
    ){
    console.log('config', config);
    this.set({lat: config.latitude, lng: config.longitude});
  }

  set(params: MapParams): void {
    console.log('MapParametersService.set', params);
    this.subject.next(params);
  }

  get(): Observable<MapParams> {
    return this.subject.asObservable();
  }
  
}
