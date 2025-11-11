import { Component, EventEmitter, Output } from '@angular/core';
import { LoanApplicationService } from '../loan-application.service';

@Component({
  selector: 'app-step4-details',
  templateUrl: './step4-details.component.html',
  styleUrls: ['./step4-details.component.scss']
})
export class Step4DetailsComponent {
  @Output() next = new EventEmitter<void>();

  @Output() back = new EventEmitter<void>();

  selectedTurnover: string | null = null;

  breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Apply', route: '/apply' },
    { label: 'Choose Loan Type' },
    { label: 'Business Entity' },
    { label: 'Business Vintage' },
    { label: 'Business Turnover', isActive: true }
  ];

  constructor(private loanService: LoanApplicationService) { }
  ngOnInit() {
    // ✅ Restore previous entity selection if exists
    this.selectedTurnover = this.loanService.getEntityTurnover();
  }
  TurnoverTypes = [
    { name: 'Less than 1 Crore', title: 'Less than 1 Crore', icon: 'assets/img/svgs/coins.svg', description: 'Single-owner business model.' },
    { name: '1 to 3 Crores', title: '1 to 3 Crores', icon: 'assets/img/svgs/3crore.svg', description: 'Run your business with partners.' },
    { name: '3 to 5 Crores', title: '3 to 5 Crores', icon: 'assets/img/svgs/5 crore.svg', description: 'Incorporated company structure.' },
    { name: '5 to 10 Crores', title: '5 to 10 Crores', icon: 'assets/img/svgs/10crore.svg', description: 'Hybrid business type.' },
    { name: 'More than 10 Crores', title: 'More than 10 Crores', icon: 'assets/img/svgs/10+crore.svg', description: 'Incorporated company structure.' },
  ];

  selectEntity(entity: string) {
    this.selectedTurnover = entity;
    this.loanService.setEntityTurnover(entity);
    this.next.emit(); // move to final review page
  }
  continue() {
    if (this.selectedTurnover) this.next.emit();
  }
   goBack() {
    this.back.emit(); // 👈 notify parent to go to previous step
  }
}
