import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4DetailsComponent } from './step4-details.component';

describe('Step4DetailsComponent', () => {
  let component: Step4DetailsComponent;
  let fixture: ComponentFixture<Step4DetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Step4DetailsComponent]
    });
    fixture = TestBed.createComponent(Step4DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
