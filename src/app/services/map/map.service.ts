import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AppConfig, APP_CONFIG } from '../index';

@Injectable()
export class MapParametersService {

  private subject = new Subject<any>();

  constructor(
      @Inject(APP_CONFIG) config: AppConfig
    ){
    console.log('config', config);
  }
  
  set(params: any): void {
    console.log('MapParametersService.set', params);
    this.subject.next(params);
  }

  get(): Observable<any> {
    return this.subject.asObservable();
  }
  
}
