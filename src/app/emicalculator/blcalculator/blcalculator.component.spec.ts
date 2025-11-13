import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlcalculatorComponent } from './blcalculator.component';

describe('BlcalculatorComponent', () => {
  let component: BlcalculatorComponent;
  let fixture: ComponentFixture<BlcalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlcalculatorComponent]
    });
    fixture = TestBed.createComponent(BlcalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
