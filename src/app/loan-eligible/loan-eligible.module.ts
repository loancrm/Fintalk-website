import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoanEligibleComponent } from './loan-eligible.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { ContactDetailsModule } from '../contact-details/contact-details.module';



@NgModule({
  declarations: [
    LoanEligibleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BreadcrumbModule,
    ContactDetailsModule
  ],
  exports: [
    LoanEligibleComponent
  ]
})
export class LoanEligibleModule { }
