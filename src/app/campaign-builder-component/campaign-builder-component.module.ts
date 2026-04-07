
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { ButtonModule }    from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule }    from 'primeng/select';
import { ToastModule }     from 'primeng/toast';

import { CampaignBuilderComponentComponent } from './campaign-builder-component.component';

@NgModule({
  declarations: [
    CampaignBuilderComponentComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    ToastModule,
  ],
  // exports: [
  //   CampaignBuilderComponentComponent
  // ]
})
export class CampaignBuilderComponentModule { }