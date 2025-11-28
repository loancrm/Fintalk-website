import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoanApplicationService {
  constructor() { }

  private selectedLoanType: string | null = null;
  private selectedEntityType: string | null = null;
  private selectedMonthlyIncome: string | null = null;

  private selectedVintage: string | null = null;
  private selectedTurnover: string | null = null;
  private experience: string | null = null;
  private selectedProfession: string | null = null;
  private selectedEducationType: string | null = null;
  private selectedCourseLevel: string | null = null;
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
  setProfession(profession: string) {
    this.selectedProfession = profession;
  }
  setWorkExperience(exp: string) {
    this.experience = exp;
  }
  getEntityVintage() {
    return this.selectedVintage;
  }
  getProfession() {
    return this.selectedProfession;
  }
  getCourseLevel() {
    return this.selectedCourseLevel;
  }
  setEntityTurnover(turnover: string) {
    this.selectedTurnover = turnover;
  }
  setEducationType(turnover: string) {
    this.selectedEducationType = turnover;
  }
  setCourseLevel(level: string) {
    this.selectedCourseLevel = level;
  }
  setCompanyName(turnover: string) {
    this.selectedCompany = turnover;
  }
  getEntityType() {
    return this.selectedEntityType;
  }
  getEducationType() {
    return this.selectedEducationType;
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
