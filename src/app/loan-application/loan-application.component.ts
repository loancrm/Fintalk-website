import { Component } from '@angular/core';

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.scss']
})
export class LoanApplicationComponent {
  currentStep = 1;
  totalSteps = 5;
  showContactDetails = false;
  nextStep() {
    if (this.currentStep < this.totalSteps) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
    this.showContactDetails = false;
  }

  progressWidth() {
    return (this.currentStep / this.totalSteps) * 100;
  }
  openContactDetails() {
    console.log('openContactDetails');
    this.showContactDetails = true;
  }
}
