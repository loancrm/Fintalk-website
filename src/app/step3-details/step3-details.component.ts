import { Component, EventEmitter, Output } from '@angular/core';
import { LoanApplicationService } from '../loan-application.service';

@Component({
    selector: 'app-step3-details',
    templateUrl: './step3-details.component.html',
    styleUrls: ['./step3-details.component.scss'],
    standalone: false
})
export class Step3DetailsComponent {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  selectedVintage: string | null = null;
  loanType: any;
  selectedIncome: string | null = null;
  selectedCourseLevel: any;

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
  breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Apply', route: '/apply' },
    { label: 'Choose Loan Type' },
    { label: 'Business Entity' },
    { label: 'Business Vintage', isActive: true },
  ];
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
      icon: 'assets/img/svgs/2.svg',
      description: 'Basic professional experience.',
    },
    {
      name: '2_5_years',
      title: '2 - 5 Years',
      icon: 'assets/img/svgs/3.svg',
      description: 'Mid-level work experience category.',
    },
    {
      name: '5_10_years',
      title: '5 - 10 Years',
      icon: 'assets/img/svgs/4.svg',
      description: 'Experienced professional range.',
    },
    {
      name: '10_plus_years',
      title: '10+ Years',
      icon: 'assets/img/svgs/5.svg',
      description: 'Highly experienced professional.',
    },
  ];
  selectedExperience: string | null = null;
  constructor(private loanService: LoanApplicationService) { }
  ngOnInit() {
    this.loanType = this.loanService.getLoanType();
    // ✅ Restore previous entity selection if exists
    this.selectedCourseLevel = this.loanService.getCourseLevel();
    this.selectedExperience = this.loanService.getExperience();
    this.selectedVintage = this.loanService.getEntityVintage();
    this.selectedIncome = this.loanService.getIncome();

  }

  VinatgeTypes = [
    {
      name: '0 to 3 Years',
      title: '0 to 3 Years',
      icon: 'assets/img/svgs/0-3.svg',
      description: 'Single-owner business model.',
    },
    {
      name: '3 to 6 Years',
      title: '3 to 6 Years',
      icon: 'assets/img/svgs/3-5.svg',
      description: 'Run your business with partners.',
    },
    {
      name: '6 to 10 Years',
      title: '6 to 10 Years',
      icon: 'assets/img/svgs/6-8.svg',
      description: 'Incorporated company structure.',
    },
    {
      name: '10+ Years',
      title: '10+ Years',
      icon: 'assets/img/svgs/10+.svg',
      description: 'Hybrid business type.',
    },
  ];
  courseLevels = [
    {
      name: 'ug',
      title: 'Undergraduate (UG)',
      icon: 'assets/img/svgs/education1.svg',
      description: 'Bachelor-level programs like B.Tech, MBBS, BBA, B.Com, etc.'
    },
    {
      name: 'pg',
      title: 'Postgraduate (PG)',
      icon: 'assets/img/svgs/education2.svg',
      description: 'Master’s courses such as M.Tech, MBA, MS, M.Sc, etc.'
    },
    {
      name: 'diploma',
      title: 'Diploma / Certification',
      icon: 'assets/img/svgs/education3.svg',
      description: 'Short-term or long-term diploma or certification programs.'
    },
    {
      name: 'phd',
      title: 'PhD / Research',
      icon: 'assets/img/svgs/education4.svg',
      description: 'Doctorate and advanced research programs.'
    }
  ];

  selectIncome(entity: string) {
    this.selectedIncome = entity;
    this.loanService.setMonthlyIncome(entity);
    this.next.emit(); // move to final review page
  }
  selectEntity(entity: string) {
    this.selectedVintage = entity;
    this.loanService.setEntityVintage(entity);
    this.next.emit(); // move to final review page
  }
  selectExperience(exp: string) {
    this.selectedExperience = exp;
    this.loanService.setWorkExperience(exp);
    this.next.emit(); // move to final review page
  }
  continue() {
    if (this.selectedVintage) this.next.emit();
  }
  goBack() {
    this.back.emit(); // 👈 notify parent to go to previous step
  }

  selectCourseLevel(level: string) {
    this.selectedCourseLevel = level;
    this.loanService.setCourseLevel(level);
    this.next.emit(); // move to final review page
  }
}
