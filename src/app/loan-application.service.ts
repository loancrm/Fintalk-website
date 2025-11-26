import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoanApplicationService {
  constructor() {}

  private selectedLoanType: string | null = null;
  private selectedEntityType: string | null = null;
  private selectedMonthlyIncome: string | null = null;

  private selectedVintage: string | null = null;
  private selectedTurnover: string | null = null;
  private experience: string | null = null;
  private selectedCompany: string | null = null;

  setLoanType(type: string) {
    this.selectedLoanType = type;
  }

  getLoanType() {
    console.log(this.selectedLoanType);
    return this.selectedLoanType;
  }
  getEntityTurnover() {
    console.log(this.selectedTurnover);
    return this.selectedTurnover;
  }
  setEntityType(entity: string) {
    this.selectedEntityType = entity;
  }
  setMonthlyIncome(entity: string) {
    this.selectedMonthlyIncome = entity;
  }
  setEntityVintage(vintage: string) {
    this.selectedVintage = vintage;
  }
  setWorkExperience(exp: string) {
    this.experience = exp;
  }
  getEntityVintage() {
    return this.selectedVintage;
  }

  setEntityTurnover(turnover: string) {
    this.selectedTurnover = turnover;
  }

  setCompanyName(turnover: string) {
    this.selectedCompany = turnover;
  }
  getEntityType() {
    return this.selectedEntityType;
  }
  getExperience() {
    return this.experience;
  }
  getIncome() {
    return this.selectedMonthlyIncome;
  }

  getFinalSelection() {
    return {
      loanType: this.selectedLoanType,
      entityType: this.selectedEntityType,
    };
  }

  resetSelections() {
    this.selectedLoanType = null;
    this.selectedEntityType = null;
  }
}
