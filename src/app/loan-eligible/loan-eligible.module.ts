import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoanEligibleComponent } from './loan-eligible.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';



@NgModule({
  declarations: [
    LoanEligibleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BreadcrumbModule
  ],
  exports: [
    LoanEligibleComponent
  ]
})
export class LoanEligibleModule { }
