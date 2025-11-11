import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Step1LoanTypeComponent } from './step1-loan-type.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';



@NgModule({
  declarations: [
    Step1LoanTypeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BreadcrumbModule
  ],
  exports:[
    Step1LoanTypeComponent
  ]
})
export class Step1LoanTypeModule { }
