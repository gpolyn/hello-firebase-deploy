import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceTypesMenuComponent } from './place-types-menu.component';

describe('PlaceTypesMenuComponent', () => {
  let component: PlaceTypesMenuComponent;
  let fixture: ComponentFixture<PlaceTypesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceTypesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceTypesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
