import { Injectable, forwardRef, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { PlaceType } from '../../place-types';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../index'
import { EstablishmentsService } from '../../establishments.service';

@Injectable()
export class SelectedPlaceTypeService {

  readonly STORAGE_REF = 'selectedPlaceType';
  private subject = new Subject<PlaceType>();
	private _hasType: boolean = false;


  constructor(private storage: StorageService,
    @Inject(forwardRef(() => EstablishmentsService)) private establishmentsSvc: EstablishmentsService)
  {
    const lastCategory = storage.get(this.STORAGE_REF);
    if (lastCategory) this.subject.next(lastCategory);
    establishmentsSvc.getCurrentSelection().subscribe( est => {
      if (!this._hasType) {
        //console.log('SelectedPlaceTypeService', est.types);
        // console.log('SelectedPlaceTypeService', (<any>Object).keys(PlaceType));
        let selection: any;
        est.types.forEach(type => {
          for (let item in PlaceType){
            if (item === type) {
              selection = item;
            }
            if (selection !== undefined) break;
          }
        });
        if (selection !== undefined) this.set(PlaceType[selection]);
      }
    })
  }

	get hasType(): boolean {
			return this._hasType;
	}
  
  set(placeType: PlaceType): void {
    this._hasType = true;
    this.subject.next(placeType);
  }

  get(): Observable<PlaceType> {
    return this.subject.asObservable();
  }
  
}
