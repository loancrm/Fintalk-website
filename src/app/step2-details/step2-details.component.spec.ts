import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2DetailsComponent } from './step2-details.component';

describe('Step2DetailsComponent', () => {
  let component: Step2DetailsComponent;
  let fixture: ComponentFixture<Step2DetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Step2DetailsComponent]
    });
    fixture = TestBed.createComponent(Step2DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
