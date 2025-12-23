import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlcalculatorComponent } from './blcalculator.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Routes } from '@angular/router';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ApexChartsModule } from '../../apex-charts/apex-charts.module';

@NgModule({
  declarations: [
    BlcalculatorComponent
  ],
  imports: [
    CommonModule,
     FormsModule,
     ApexChartsModule,
    // RouterModule.forChild(routes),
    SliderModule,
    TabsModule,
    TableModule,
    ButtonModule,
    InputTextModule
  ],
  exports:[
    BlcalculatorComponent
  ]
})
export class BlcalculatorModule { }
