import { Component, EventEmitter, Output } from '@angular/core';
import { LoanApplicationService } from '../loan-application.service';

@Component({
  selector: 'app-step1-loan-type',
  templateUrl: './step1-loan-type.component.html',
  styleUrls: ['./step1-loan-type.component.scss']
})
export class Step1LoanTypeComponent {
  @Output() next = new EventEmitter<void>();
  selectedType: string | null = null;

  breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Apply', route: '/apply' },
    { label: 'Choose Loan Type', isActive: true }
  ];

  loanTypes = [
    {
      value: 'Business Loan',
      title: 'Business Loan',
      description: 'For Business Expansion, Working Capital and other Business needs',
      icon: 'assets/img/svgs/business.svg',

    },
    {
      value: 'Professional Loan',
      title: 'Professional Loan',
      description: 'Specialized Loans for Certified Professionals like Doctors and Architects.',
      icon: 'assets/img/svgs/professional.svg',
    },
    {
      value: 'Personal Loan',
      title: 'Personal Loan',
      description: 'For Personal Expenses, Wedding, Travel or debt Consolidation',
      icon: 'assets/img/svgs/personal.svg',

    },
    {
      value: 'Education Loan',
      title: 'Education Loan',
      description: 'For Higher Studies, Tuition Fees and other Educational needs',
      icon: 'assets/img/svgs/educational.svg',

    }
  ];

  constructor(private loanService: LoanApplicationService) { }

  ngOnInit() {
    // ✅ Restore previous entity selection if exists
    this.selectedType = this.loanService.getLoanType();
    console.log(this.selectedType)

  }
  selectType(type: string) {
    this.selectedType = type;
    this.loanService.setLoanType(type);
    this.next.emit(); // navigate to next step (Contact Details)

  }

  continue() {
    if (this.selectedType) this.next.emit();
  }
}
