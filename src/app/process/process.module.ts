import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessComponent } from './process.component';

import { StepsModule } from 'primeng/steps';

@NgModule({
  declarations: [
    ProcessComponent
  ],
  imports: [
    CommonModule,
    StepsModule
  ],
  exports:[
    ProcessComponent
  ]
})
export class ProcessModule { }
