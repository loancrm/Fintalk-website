import { Component } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent {
  loanSteps = [
    {
      title: 'Apply Online',
      description: 'Submit your business loan request through a simple form.',
      image: 'assets/illustrations/apply.svg'
    },
    {
      title: 'Upload Documents',
      description: 'Easily upload required KYC and business documents.',
      image: 'assets/illustrations/upload.svg'
    },
    {
      title: 'Verification',
      description: 'We verify your documents and check your eligibility.',
      image: 'assets/illustrations/verify.svg'
    },
    {
      title: 'Approval',
      description: 'If eligible, you get loan approval in 24-48 hours.',
      image: 'assets/illustrations/approve.svg'
    },
    {
      title: 'Disbursal',
      description: 'Loan is credited directly to your account.',
      image: 'assets/illustrations/disburse.svg'
    }
  ];

}
