import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEstimateButtonComponent } from './get-estimate-button.component';

describe('GetEstimateButtonComponent', () => {
  let component: GetEstimateButtonComponent;
  let fixture: ComponentFixture<GetEstimateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetEstimateButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEstimateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
