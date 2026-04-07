import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignBuilderComponentComponent } from './campaign-builder-component.component';

describe('CampaignBuilderComponentComponent', () => {
  let component: CampaignBuilderComponentComponent;
  let fixture: ComponentFixture<CampaignBuilderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignBuilderComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignBuilderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
