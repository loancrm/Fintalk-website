import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmicalculatorComponent } from './emicalculator.component';
import { BlcalculatorModule } from './blcalculator/blcalculator.module';
import { PlcalculatorModule } from './plcalculator/plcalculator.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmicalculatorComponent
  ],
  imports: [
    CommonModule,
    BlcalculatorModule,
    ButtonModule,
    FormsModule,
    PlcalculatorModule
  ],
  exports:[
    EmicalculatorComponent
  ]
})
export class EmicalculatorModule { }
