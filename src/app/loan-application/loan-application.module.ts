import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanApplicationComponent } from './loan-application.component';
import { FormsModule } from '@angular/forms';
import { Step1LoanTypeModule } from '../step1-loan-type/step1-loan-type.module';
// Steps 2-5 are loaded eagerly but only Step1 is rendered initially
// This is acceptable since they're part of the same wizard flow
import { Step2DetailsModule } from '../step2-details/step2-details.module';
import { ContactDetailsModule } from '../contact-details/contact-details.module';
import { LoanEligibleModule } from '../loan-eligible/loan-eligible.module';
import { Step3DetailsModule } from '../step3-details/step3-details.module';
import { Step4DetailsModule } from '../step4-details/step4-details.module';



@NgModule({
  declarations: [
    LoanApplicationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Step1LoanTypeModule, // Critical - rendered first
    Step2DetailsModule, // Loaded but not rendered until step 2
    ContactDetailsModule, // Loaded but not rendered until step 5
    LoanEligibleModule, // Loaded but not rendered until step 5
    Step3DetailsModule, // Loaded but not rendered until step 3
    Step4DetailsModule, // Loaded but not rendered until step 4
  ], exports: [
    LoanApplicationComponent
  ]
})
export class LoanApplicationModule { }
