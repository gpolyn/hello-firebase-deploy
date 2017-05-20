import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { PlaceType } from './place-types';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SelectedPlaceTypeService {

  private subject = new Subject<PlaceType>();
  
  set(placeType: PlaceType): void {
    this.subject.next(placeType);
  }

  get(): Observable<PlaceType> {
    return this.subject.asObservable();
  }
  
}
