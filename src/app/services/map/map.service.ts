import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AppConfig, APP_CONFIG } from '../index';
import { MapParams } from './map-params';

@Injectable()
export class MapParametersService {

  private subject = new Subject<MapParams>();
  readonly DEFAULT_ZOOM: number = 14;

  constructor(
      @Inject(APP_CONFIG) config: AppConfig
    ){
    this.set({lat: config.latitude, lng: config.longitude});
  }

  set(params: MapParams): void {
    this.subject.next(params);
  }

  get(): Observable<MapParams> {
    return this.subject.asObservable();
  }
  
}
