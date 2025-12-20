import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmicalculatorComponent } from './emicalculator.component';
import { BlcalculatorModule } from './blcalculator/blcalculator.module';
import { PlcalculatorModule } from './plcalculator/plcalculator.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    EmicalculatorComponent
  ],
  imports: [
    CommonModule,
    BlcalculatorModule,
    ButtonModule,
    FormsModule,
    PlcalculatorModule,
    RouterModule.forChild([
      { path: '', component: EmicalculatorComponent }
    ])
  ],
  exports:[
    EmicalculatorComponent
  ]
})
export class EmicalculatorModule { }
