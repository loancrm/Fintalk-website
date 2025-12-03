import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Step4DetailsComponent } from './step4-details.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    Step4DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BreadcrumbModule,
    InputTextModule,
  ],
  exports:[
    Step4DetailsComponent
  ]
})
export class Step4DetailsModule { }
