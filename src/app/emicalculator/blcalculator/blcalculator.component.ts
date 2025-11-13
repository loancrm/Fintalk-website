import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Location } from '@angular/common';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-blcalculator',
  templateUrl: './blcalculator.component.html',
  styleUrls: ['./blcalculator.component.scss']
})
export class BlcalculatorComponent {
 // Flat Loan
 loanAmount: number = 500000;
 interestRate: number = 10;
 tenure: number = 2; // years
 emi: number = 0;
 totalInterest: number = 0;
 totalPayable: number = 0;
 repaymentSchedule: any[] = [];

 // Diminishing Loan
 diminishingloanAmount: number = 500000;
 diminishinginterestRate: number = 10;
 diminishingtenure: number = 2;
 diminishingemi: number = 0;
 diminishingtotalInterest: number = 0;
 diminishingtotalPayable: number = 0;
 diminishingrepaymentSchedule: any[] = [];

 // Common
 cppCharges: string = 'AS PER CLIENT AGE ';
 pfAmount: number = 0;
 activeTab: number = 0;
 piechartOptions: any;
 diminishingpiechartOptions: any;
 businessName: string = '';
 activeCalculator: 'business' | 'personal' | 'home' = 'business';
 constructor(private router: Router, private route: ActivatedRoute, private location: Location,) { }

 ngOnInit(): void {
   this.calculateEMI();
   this.calculateDiminishingEMI();
   const path = this.route.snapshot.routeConfig?.path;
   if (path?.includes('personal')) this.activeCalculator = 'personal';
   else if (path?.includes('home')) this.activeCalculator = 'home';
   else this.activeCalculator = 'business';
 }

 limitInterestDecimals(event: Event): void {
   const input = event.target as HTMLInputElement;
   let value = input.value;

   value = value.replace(/[^0-9.]/g, '');

   const parts = value.split('.');
   if (parts.length > 2) {
     value = parts[0] + '.' + parts[1];
   }

   if (parts[1]?.length > 2) {
     parts[1] = parts[1].slice(0, 2);
     value = parts.join('.');
   }

   if (value !== '' && value !== '.' && !value.endsWith('.')) {
     const num = Number(value);
     if (num > 15) {
       value = '15';
     }
   }

   input.value = value;
   this.interestRate = Number(value) || 0;
 }

 limitInterestDiminishing(event: Event): void {
   const input = event.target as HTMLInputElement;
   let value = input.value;

   value = value.replace(/[^0-9.]/g, '');

   const parts = value.split('.');
   if (parts.length > 2) {
     value = parts[0] + '.' + parts[1];
   }

   if (parts[1]?.length > 2) {
     parts[1] = parts[1].slice(0, 2);
     value = parts.join('.');
   }

   if (value !== '' && value !== '.' && !value.endsWith('.')) {
     const num = Number(value);
     if (num > 25) {
       value = '25';
     }
   }

   input.value = value;
   this.diminishinginterestRate = Number(value) || 0;



 }
 preventInvalidKeys(event: KeyboardEvent) {
   const invalidKeys = ['e', 'E', '+', '-', ' '];
   if (invalidKeys.includes(event.key)) event.preventDefault();
 }

 preventInvalidPaste(event: ClipboardEvent) {
   const paste = event.clipboardData?.getData('text') || '';
   if (/[^0-9.]/.test(paste)) event.preventDefault();
 }

 limitInputLength(event: Event): void {
   const input = event.target as HTMLInputElement;
   let value = input.value.slice(0, 8);
   const num = Number(value);
   if (num > 10000000) {
     value = '10000000';
   }
   input.value = value;
   this.loanAmount = Number(value);
 }
 navigateTo(type: 'business' | 'personal' | 'home') {
   const route = `/calculator/${type}`;
   this.router.navigateByUrl(route);
 }
 goBack() {
   this.location.back();
 }
 limitInputLengthfordiminishing(event: Event, field: 'personal' | 'business'): void {
   const input = event.target as HTMLInputElement;
   let value = input.value.slice(0, 8);
   const num = Number(value);
   if (num > 10000000) {
     value = '10000000';
   }
   input.value = value;

   if (field === 'personal') {
     this.diminishingloanAmount = Number(value);
   } else if (field === 'business') {
     this.diminishingloanAmount = Number(value); // if you're also handling business loan
   }
 }
 restrictTenureKeys(event: KeyboardEvent) {
   const value = (event.target as HTMLInputElement).value;
   if (!/[0-9]/.test(event.key) && !['Backspace', 'Delete', 'Tab'].includes(event.key)) {
     event.preventDefault();
   }
   if (parseInt(value + event.key) > 4) event.preventDefault();
 }


 restrictTenureKeysdiminishing(event: KeyboardEvent) {
   const value = (event.target as HTMLInputElement).value;

   if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'Tab') {
     event.preventDefault();
   }

   if (parseInt(value + event.key) > 8) {
     event.preventDefault();
   }
 }

 limitInterestRate(event: Event): void {
   const input = event.target as HTMLInputElement;
   let value = parseFloat(input.value);
   if (isNaN(value)) return;

   if (value > 15.99) value = 15.99;
   if (value < 1) value = 1;

   input.value = value.toFixed(2);
   this.interestRate = value;
   this.calculateEMI();
 }

 calculateEMI(): void {
   const totalInterest = (this.loanAmount * this.interestRate * this.tenure) / 100;
   const totalPayable = this.loanAmount + totalInterest;
   const months = this.tenure * 12;
   const emi = Math.round(totalPayable / months);

   this.emi = emi;
   this.totalInterest = Math.round(totalInterest);
   this.totalPayable = Math.round(totalPayable);

   this.repaymentSchedule = [];
   let balance = totalPayable;

   for (let i = 1; i <= months; i++) {
     const principalPart = Math.round(this.loanAmount / months);
     const interestPart = Math.round(totalInterest / months);
     balance -= emi;

     this.repaymentSchedule.push({
       month: `Month ${i}`,
       emi,
       principal: principalPart,
       interest: interestPart,
       balance: balance > 0 ? Math.round(balance) : 0
     });
   }

   this.updateChart();
 }

 calculateDiminishingEMI(): void {
   const principal = this.diminishingloanAmount;
   const months = this.diminishingtenure * 12;
   const monthlyRate = this.diminishinginterestRate / 12 / 100;

   const emi =
     (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
     (Math.pow(1 + monthlyRate, months) - 1);

   this.diminishingemi = Math.round(emi);
   this.diminishingrepaymentSchedule = [];
   this.diminishingtotalInterest = 0;

   let balance = principal;

   for (let i = 1; i <= months; i++) {
     const interestPart = Math.round(balance * monthlyRate);
     const principalPart = Math.round(this.diminishingemi - interestPart);
     balance -= principalPart;
     this.diminishingtotalInterest += interestPart;

     this.diminishingrepaymentSchedule.push({
       month: `Month ${i}`,
       emi: this.diminishingemi,
       principal: principalPart,
       interest: interestPart,
       balance: balance > 0 ? Math.round(balance) : 0
     });
   }

   this.diminishingtotalPayable = Math.round(this.diminishingemi * months);
   this.updateChart();
 }

 updateChart(): void {
   this.piechartOptions = {
     series: [this.loanAmount, this.totalInterest],
     chart: { type: 'donut', height: 320 },
     labels: ['Principal', 'Interest'],
     colors: ['#1A2A36', '#4FAF9F'],
     legend: { position: 'bottom' }
   };

   this.diminishingpiechartOptions = {
     series: [this.diminishingloanAmount, this.diminishingtotalInterest],
     chart: { type: 'donut', height: 320 },
     labels: ['Principal', 'Interest'],
     colors: ['#1A2A36', '#4FAF9F'],
     legend: { position: 'bottom' }
   };
 }


 generatePDF(): void {
   const doc = new jsPDF();
   const pageWidth = doc.internal.pageSize.getWidth();
   const pageHeight = doc.internal.pageSize.getHeight();
   const businessName = this.businessName;

   const addHeader = () => {
     doc.setFont('helvetica', 'bold');
     doc.setFontSize(18);
     doc.setTextColor('#000');
     doc.text(businessName?.toUpperCase() || 'LOAN REPORT', pageWidth / 2, 15, { align: 'center' });
   };



   const drawWatermark = () => {
     doc.setFont('helvetica', 'medium');
     doc.setTextColor(230, 230, 230); // very light gray
     doc.setFontSize(60);
     doc.text('Fintalk', pageWidth / 2, pageHeight / 2, {
       angle: 25,
       align: 'center'
     });
   };

   addHeader();

   autoTable(doc, {
     startY: 25,
     body: [
       ['Loan Amount:', `Rs. ${this.loanAmount}`, 'Monthly EMI:', `Rs. ${this.emi}`],
       ['Interest Rate (Flat):', `${this.interestRate}%`, 'Interest:', `Rs. ${this.totalInterest}`],
       ['Tenure:', `${this.tenure} years`, 'Total Payable:', `Rs. ${this.totalPayable}`],
       ['CPP (One Time Charges):', `${this.cppCharges}`, 'PF % On Loan Amount (One Time Charges):', ` ${this.pfAmount}`]
     ],
     theme: 'grid',
   });
   const finalY = (doc as any).lastAutoTable.finalY + 10;

   doc.text('Repayment Schedule', 14, finalY);
   drawWatermark();
   autoTable(doc, {
     head: [['S. No.', 'Month', 'EMI', 'Principal', 'Interest', 'Balance']],
     body: this.repaymentSchedule.map((r, i) => [
       i + 1, r.month, r.emi, r.principal, r.interest, r.balance
     ]),
     startY: finalY + 5,
     margin: { top: 25 },
     headStyles: { fillColor: [41, 65, 91], textColor: 255 },
     theme: 'plain',
     styles: { textColor: [0, 0, 0] },
     willDrawPage: () => {
       addHeader();
       drawWatermark();
     }
   });
   doc.save(`${businessName?.toUpperCase() || 'LOAN'}-EMI-REPORT.pdf`);
 }


 onTabChange() {
   this.updateChart();
 }

 generatediminishingPDF(): void {
   const doc = new jsPDF();
   const pageWidth = doc.internal.pageSize.getWidth();
   const pageHeight = doc.internal.pageSize.getHeight();
   const businessName = this.businessName;

   const addHeader = () => {
     doc.setFont('helvetica', 'bold');
     doc.setFontSize(18);
     doc.setTextColor('#29415B');
     doc.text(businessName?.toUpperCase() || 'LOAN REPORT', pageWidth / 2, 15, { align: 'center' });
   };

   const addWatermark = () => {
     doc.setFont('helvetica', 'medium');
     doc.setTextColor(230, 230, 230);
     doc.setFontSize(60);
     doc.text('Fintalk', pageWidth / 2, pageHeight / 2, { angle: 25, align: 'center' });
   };

   addHeader();

   autoTable(doc, {
     startY: 25,
     body: [
       ['Loan Amount:', `Rs. ${this.diminishingloanAmount}`, 'Monthly EMI:', `Rs. ${this.diminishingemi}`],
       ['Interest Rate (Diminishing):', `${this.diminishinginterestRate}%`, 'Interest:', `Rs. ${this.diminishingtotalInterest}`],
       ['Tenure:', `${this.diminishingtenure} years`, 'Total Payable:', `Rs. ${this.diminishingtotalPayable}`],
       ['CPP (One Time Charges):', `${this.cppCharges}`, 'PF % On Loan Amount (One Time Charges):', ` ${this.pfAmount}`]
     ],
     theme: 'grid',
   });
   const finalY = (doc as any).lastAutoTable.finalY + 10;

   doc.text('Repayment Schedule', 14, finalY);

   addWatermark();

   autoTable(doc, {
     head: [['S. No.', 'Month', 'EMI', 'Principal', 'Interest', 'Balance']],
     body: this.diminishingrepaymentSchedule.map((r, i) => [
       i + 1, r.month, r.emi, r.principal, r.interest, r.balance
     ]),
     startY: finalY + 5,
     margin: { top: 25 },
     headStyles: { fillColor: [41, 65, 91], textColor: 255 },
     theme: 'plain',
     styles: { textColor: [0, 0, 0] },
     willDrawPage: () => {
       addHeader();
       addWatermark();
     }
   });

   doc.save(`${businessName?.toUpperCase() || 'LOAN'}-DIMINISHING-REPORT.pdf`);
 }
}
