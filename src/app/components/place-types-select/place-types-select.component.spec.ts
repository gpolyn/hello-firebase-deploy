import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceTypesSelectComponent } from './place-types-select.component';

describe('PlaceTypesSelectComponent', () => {
  let component: PlaceTypesSelectComponent;
  let fixture: ComponentFixture<PlaceTypesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceTypesSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceTypesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
