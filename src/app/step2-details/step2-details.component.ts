import { Component, EventEmitter, Output } from '@angular/core';
import { LoanApplicationService } from '../loan-application.service';

@Component({
  selector: 'app-step2-details',
  templateUrl: './step2-details.component.html',
  styleUrls: ['./step2-details.component.scss'],
})
export class Step2DetailsComponent {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  loanType: any;
  selectedEntity: string | null = null;
  selectedIncome: string | null = null;

  breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Apply', route: '/apply' },
    { label: 'Choose Loan Type' },
    { label: 'Business Entity', isActive: true },
  ];

  constructor(private loanService: LoanApplicationService) {}

  entityTypes = [
    {
      name: 'Sole Proprietor',
      title: 'Sole Proprietor',
      icon: 'assets/img/svgs/personal.svg',
      description: 'Single-owner business model.',
    },
    {
      name: 'Partnership',
      title: 'Partnership',
      icon: 'assets/img/svgs/partner.svg',
      description: 'Run your business with partners.',
    },
    {
      name: 'Private Limited',
      title: 'Private Limited',
      icon: 'assets/img/svgs/private.svg',
      description: 'Incorporated company structure.',
    },
    {
      name: 'Limited Liability Company',
      title: 'Limited Liability Company',
      icon: 'assets/img/svgs/llp.svg',
      description: 'Hybrid business type.',
    },
  ];

  incomeRanges = [
    {
      name: 'Below 15000',
      title: 'Below ₹15,000',
      icon: 'assets/img/svgs/0-3.svg',
      description: 'For income less than ₹15,000 per month.',
    },
    {
      name: '15000_25000',
      title: '₹15,000 - ₹25,000',
      icon: 'assets/img/svgs/3-5.svg',
      description: 'Suitable for basic salaried earners.',
    },
    {
      name: '25000_40000',
      title: '₹25,000 - ₹40,000',
      icon: 'assets/img/svgs/6-8.svg',
      description: 'Ideal for mid-level income group.',
    },
    {
      name: '40000_60000',
      title: '₹40,000 - ₹60,000',
      icon: 'assets/img/svgs/10+.svg',
      description: 'Well-qualified income bracket.',
    },
    {
      name: '60000_100000',
      title: '₹60,000 - ₹1,00,000',
      icon: 'assets/img/svgs/10+.svg',
      description: 'Strong earning capacity category.',
    },
    {
      name: 'Above_100000',
      title: 'Above ₹1,00,000',
      icon: 'assets/img/svgs/10+.svg',
      description: 'High income earning group.',
    },
  ];

  ngOnInit() {
    // ✅ Restore previous entity selection if exists
    this.loanType = this.loanService.getLoanType();
    this.selectedEntity = this.loanService.getEntityType();
    this.selectedIncome = this.loanService.getIncome();
  }

  selectEntity(entity: string) {
    this.selectedEntity = entity;
    this.loanService.setEntityType(entity);
    this.next.emit(); // move to final review page
  }

  selectIncome(entity: string) {
    this.selectedIncome = entity;
    this.loanService.setMonthlyIncome(entity);
    this.next.emit(); // move to final review page
  }
  continue() {
    if (this.selectedEntity) this.next.emit();
  }
  goBack() {
    this.back.emit(); // 👈 notify parent to go to previous step
  }
}
