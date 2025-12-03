import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoanApplicationService } from '../loan-application.service';

@Component({
  selector: 'app-loan-eligible',
  templateUrl: './loan-eligible.component.html',
  styleUrls: ['./loan-eligible.component.scss']
})
export class LoanEligibleComponent implements OnInit {
   loanType: any ; // dynamic loan type (e.g., "Business Loan")
  @Output() next = new EventEmitter<void>();
  @Output() contactUs = new EventEmitter<void>();
  isSubmitted = false;
  breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Apply', route: '/apply' },
    { label: 'Choose Loan Type' },
    { label: 'Business Entity' },
    { label: 'Business Vintage' },
    { label: 'Business Turnover' },
    { label: 'Eligibility', isActive: true }
  ];

  constructor(private loanService: LoanApplicationService) { }

  onContactClick() {
    this.contactUs.emit(); // navigate to next step (Contact Details)
  }
  ngOnInit(): void {
    this.loanType = this.loanService.getLoanType();
  }
  getLoanAmount(type: string) {
  switch (type?.toLowerCase()) {
    case 'business loan':
      return 75;
    case 'professional loan':
      return 75;
    case 'personal loan':
      return 50;
    case 'educational loan':
      return null; // hide line
    default:
      return null;
  }
}

}
