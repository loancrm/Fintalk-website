import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-loan-application',
    templateUrl: './loan-application.component.html',
    styleUrls: ['./loan-application.component.scss'],
    standalone: false
})
export class LoanApplicationComponent {
  currentStep = 1;
  totalSteps = 4;
  showContactDetails = false;
  progressPercentage = 25; // Pre-calculated for step 1 to avoid function calls in template

  constructor(private cdr: ChangeDetectorRef) {}

  nextStep() {
    // Allow up to step 5 (loan-eligible), but only 4 steps shown in progress
    if (this.currentStep < 5) {
      this.currentStep++;
      this.updateProgress();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.showContactDetails = false;
      this.updateProgress();
    }
  }

  private updateProgress() {
    // Cap at 4 steps for progress calculation (step 5 is loan-eligible, not counted)
    const stepForProgress = Math.min(this.currentStep, 4);
    this.progressPercentage = (stepForProgress / this.totalSteps) * 100;
  }

  openContactDetails() {
    this.showContactDetails = true;
  }
}
