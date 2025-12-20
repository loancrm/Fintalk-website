import { Component, EventEmitter, Output } from '@angular/core';
import { LoanApplicationService } from '../loan-application.service';

@Component({
    selector: 'app-step4-details',
    templateUrl: './step4-details.component.html',
    styleUrls: ['./step4-details.component.scss'],
    standalone: false
})
export class Step4DetailsComponent {
  @Output() next = new EventEmitter<void>();
  selectedExperience: string | null = null;
  incomeRanges = [
    {
      name: 'Below 15000',
      title: 'Below ₹15,000',
      icon: 'assets/img/svgs/coins.svg',
      description: 'For income less than ₹15,000 per month.',
    },
    {
      name: '15000_25000',
      title: '₹15,000 - ₹25,000',
      icon: 'assets/img/svgs/3crore.svg',
      description: 'Suitable for basic salaried earners.',
    },
    {
      name: '25000_40000',
      title: '₹25,000 - ₹40,000',
      icon: 'assets/img/svgs/5 crore.svg',
      description: 'Ideal for mid-level income group.',
    },
    {
      name: '40000_60000',
      title: '₹40,000 - ₹60,000',
      icon: 'assets/img/svgs/10crore.svg',
      description: 'Well-qualified income bracket.',
    },
    {
      name: '60000_100000',
      title: '₹60,000 - ₹1,00,000',
      icon: 'assets/img/svgs/10+crore.svg',
      description: 'Strong earning capacity category.',
    },
    {
      name: 'Above_100000',
      title: 'Above ₹1,00,000',
      icon: 'assets/img/svgs/10+.svg',
      description: 'High income earning group.',
    },
  ];

  @Output() back = new EventEmitter<void>();
  workExpRanges = [
    {
      name: '0_1_year',
      title: '0 - 1 Year',
      icon: 'assets/img/svgs/0-3.svg',
      description: 'Beginner level work experience.',
    },
    {
      name: '1_2_years',
      title: '1 - 2 Years',
        icon: 'assets/img/svgs/3-5.svg',
      description: 'Basic professional experience.',
    },
    {
      name: '2_5_years',
      title: '2 - 5 Years',
       icon: 'assets/img/svgs/6-8.svg',
      description: 'Mid-level work experience category.',
    },
    {
      name: '5_10_years',
      title: '5 - 10 Years',
       icon: 'assets/img/svgs/10+.svg',
      description: 'Experienced professional range.',
    },
    {
      name: '10_plus_years',
      title: '10+ Years',
      icon: 'assets/img/svgs/star.svg',
      description: 'Highly experienced professional.',
    },
  ];
  selectedIncome: string | null = null;

  selectedTurnover: string | null = null;
  loanType: any;
  breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Apply', route: '/apply' },
    { label: 'Choose Loan Type' },
    { label: 'Business Entity' },
    { label: 'Business Vintage' },
    { label: 'Business Turnover', isActive: true },
  ];

  companyName: string = '';
  constructor(private loanService: LoanApplicationService) { }
  ngOnInit() {
    this.selectedIncome = this.loanService.getIncome();
    this.loanType = this.loanService.getLoanType();
    this.selectedExperience = this.loanService.getExperience();

    // ✅ Restore previous entity selection if exists
    this.selectedTurnover = this.loanService.getEntityTurnover();
  }
  TurnoverTypes = [
    {
      name: 'Less than 1 Crore',
      title: 'Less than 1 Crore',
      icon: 'assets/img/svgs/coins.svg',
      description: 'Single-owner business model.',
    },
    {
      name: '1 to 3 Crores',
      title: '1 to 3 Crores',
      icon: 'assets/img/svgs/3crore.svg',
      description: 'Run your business with partners.',
    },
    {
      name: '3 to 5 Crores',
      title: '3 to 5 Crores',
      icon: 'assets/img/svgs/5 crore.svg',
      description: 'Incorporated company structure.',
    },
    {
      name: '5 to 10 Crores',
      title: '5 to 10 Crores',
      icon: 'assets/img/svgs/10crore.svg',
      description: 'Hybrid business type.',
    },
    {
      name: 'More than 10 Crores',
      title: 'More than 10 Crores',
      icon: 'assets/img/svgs/10+crore.svg',
      description: 'Incorporated company structure.',
    },
  ];

  selectEntity(entity: string) {
    this.selectedTurnover = entity;
    this.loanService.setEntityTurnover(entity);
    this.next.emit(); // move to final review page
  }
  submitCompanyName() {
    this.loanService.setCompanyName(this.companyName);
    this.next.emit(); // move to final review page
  }
  continue() {
    if (this.selectedTurnover) this.next.emit();
  }
  goBack() {
    this.back.emit(); // 👈 notify parent to go to previous step
  }
  selectExperience(exp: string) {
    this.selectedExperience = exp;
    this.loanService.setWorkExperience(exp);
    this.next.emit(); // move to final review page
  }

  selectIncome(entity: string) {
    this.selectedIncome = entity;
    this.loanService.setMonthlyIncome(entity);
    this.next.emit(); // move to final review page
  }
}
