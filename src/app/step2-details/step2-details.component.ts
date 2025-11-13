import { Component, EventEmitter, Output } from '@angular/core';
import { LoanApplicationService } from '../loan-application.service';

@Component({
  selector: 'app-step2-details',
  templateUrl: './step2-details.component.html',
  styleUrls: ['./step2-details.component.scss']
})
export class Step2DetailsComponent {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  loanType:any
  selectedEntity: string | null = null;

  breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Apply', route: '/apply' },
    { label: 'Choose Loan Type' },
    { label: 'Business Entity', isActive: true }
  ];

  constructor(private loanService: LoanApplicationService) { }

  entityTypes = [
    { name: 'Sole Proprietor', title: 'Sole Proprietor', icon: 'assets/img/svgs/personal.svg', description: 'Single-owner business model.' },
    { name: 'Partnership', title: 'Partnership', icon: 'assets/img/svgs/partner.svg', description: 'Run your business with partners.' },
    { name: 'Private Limited', title: 'Private Limited', icon: 'assets/img/svgs/private.svg', description: 'Incorporated company structure.' },
    { name: 'Limited Liability Company', title: 'Limited Liability Company', icon: 'assets/img/svgs/llp.svg', description: 'Hybrid business type.' }
  ];
  ngOnInit() {
    // ✅ Restore previous entity selection if exists
    this.loanType = this.loanService.getLoanType();
    this.selectedEntity = this.loanService.getEntityType();
  }

  selectEntity(entity: string) {
    this.selectedEntity = entity;
    this.loanService.setEntityType(entity);
    this.next.emit(); // move to final review page
  }
  continue() {
    if (this.selectedEntity) this.next.emit();
  }
  goBack() {
    this.back.emit(); // 👈 notify parent to go to previous step
  }
}
