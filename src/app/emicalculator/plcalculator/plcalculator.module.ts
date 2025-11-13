import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlcalculatorComponent } from './plcalculator.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { ApexChartsModule } from 'src/app/apex-charts/apex-charts.module';



@NgModule({
  declarations: [
    PlcalculatorComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule, ApexChartsModule,
    // RouterModule.forChild(routes),
    SliderModule,
    TableModule,
    ButtonModule
  ],
  exports: [
    PlcalculatorComponent
  ]
})
export class PlcalculatorModule { }
