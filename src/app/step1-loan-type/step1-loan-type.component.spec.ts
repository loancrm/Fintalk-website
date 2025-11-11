import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1LoanTypeComponent } from './step1-loan-type.component';

describe('Step1LoanTypeComponent', () => {
  let component: Step1LoanTypeComponent;
  let fixture: ComponentFixture<Step1LoanTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Step1LoanTypeComponent]
    });
    fixture = TestBed.createComponent(Step1LoanTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
