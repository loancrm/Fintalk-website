import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlcalculatorComponent } from './plcalculator.component';

describe('PlcalculatorComponent', () => {
  let component: PlcalculatorComponent;
  let fixture: ComponentFixture<PlcalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlcalculatorComponent]
    });
    fixture = TestBed.createComponent(PlcalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
