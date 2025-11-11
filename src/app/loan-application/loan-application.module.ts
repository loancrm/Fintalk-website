import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanApplicationComponent } from './loan-application.component';
import { FormsModule } from '@angular/forms';
import { Step1LoanTypeModule } from '../step1-loan-type/step1-loan-type.module';
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
    Step1LoanTypeModule,
    Step2DetailsModule,
    ContactDetailsModule,
    LoanEligibleModule,
    Step3DetailsModule,
    Step4DetailsModule,
    LoanEligibleModule,
  ], exports: [
    LoanApplicationComponent
  ]
})
export class LoanApplicationModule { }
