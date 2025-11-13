import { Component } from '@angular/core';

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.scss']
})
export class LoanApplicationComponent {
  currentStep = 1;
  totalSteps = 4;
  showContactDetails = false;
  nextStep() {
    // Allow up to step 5 (loan-eligible), but only 4 steps shown in progress
    if (this.currentStep < 5) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
    this.showContactDetails = false;
  }

  progressWidth() {
    // Cap at 4 steps for progress calculation (step 5 is loan-eligible, not counted)
    const stepForProgress = Math.min(this.currentStep, 4);
    return (stepForProgress / this.totalSteps) * 100;
  }
  openContactDetails() {
    console.log('openContactDetails');
    this.showContactDetails = true;
  }
}
