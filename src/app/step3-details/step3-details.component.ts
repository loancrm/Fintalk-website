import { Component, EventEmitter, Output } from '@angular/core';
import { LoanApplicationService } from '../loan-application.service';

@Component({
  selector: 'app-step3-details',
  templateUrl: './step3-details.component.html',
  styleUrls: ['./step3-details.component.scss']
})
export class Step3DetailsComponent {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  selectedVintage: string | null = null;

  breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Apply', route: '/apply' },
    { label: 'Choose Loan Type' },
    { label: 'Business Entity' },
    { label: 'Business Vintage', isActive: true }
  ];

  constructor(private loanService: LoanApplicationService) { }
  ngOnInit() {
    // ✅ Restore previous entity selection if exists
    this.selectedVintage = this.loanService.getEntityVintage();
  }

  VinatgeTypes = [
    { name: '0 to 3 Years', title: '0 to 3 Years', icon: 'assets/img/svgs/0-3.svg', description: 'Single-owner business model.' },
    { name: '3 to 6 Years', title: '3 to 6 Years', icon: 'assets/img/svgs/3-5.svg', description: 'Run your business with partners.' },
    { name: '6 to 10 Years', title: '6 to 10 Years', icon: 'assets/img/svgs/6-8.svg', description: 'Incorporated company structure.' },
    { name: '10+ Years', title: '10+ Years', icon: 'assets/img/svgs/10+.svg', description: 'Hybrid business type.' }
  ];

  selectEntity(entity: string) {
    this.selectedVintage = entity;
    this.loanService.setEntityVintage(entity);
    this.next.emit(); // move to final review page
  }
  continue() {
    if (this.selectedVintage) this.next.emit();
  }
  goBack() {
    this.back.emit(); // 👈 notify parent to go to previous step
  }
}
