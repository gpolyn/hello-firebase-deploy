import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { PlaceType } from './place-types';
import { Observable } from 'rxjs/Observable';
import { StorageService } from './services';

@Injectable()
export class SelectedPlaceTypeService {

  readonly STORAGE_REF = 'selectedPlaceType';
  private subject = new Subject<PlaceType>();

  constructor(private storage: StorageService){
    const lastCategory = storage.get(this.STORAGE_REF);
    if (lastCategory) this.subject.next(lastCategory);
  }
  
  set(placeType: PlaceType): void {
    this.subject.next(placeType);
  }

  get(): Observable<PlaceType> {
    return this.subject.asObservable();
  }
  
}
