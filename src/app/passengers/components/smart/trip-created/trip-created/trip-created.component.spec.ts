import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCreatedComponent } from './trip-created.component';

describe('TripCreatedComponent', () => {
  let component: TripCreatedComponent;
  let fixture: ComponentFixture<TripCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
