import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplyComponent } from './apply.component';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ApplyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
  ],
  exports:[
    ApplyComponent
  ]
})
export class ApplyModule { }
