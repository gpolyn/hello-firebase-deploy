import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MapParametersService {

  private subject = new Subject<any>();
  
  set(params: any): void {
    console.log('MapParametersService.set', params);
    this.subject.next(params);
  }

  get(): Observable<any> {
    return this.subject.asObservable();
  }
  
}
