import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-plcalculator',
  templateUrl: './plcalculator.component.html',
  styleUrls: ['./plcalculator.component.scss']
})
export class PlcalculatorComponent {
  loanAmount: number = 500000;
  interestRate: number = 10;
  tenure: number = 2;
  cppCharges: string = 'AS PER CLIENT AGE + GST';
  pfAmount: number = 0;
  activeCalculator: 'business' | 'personal' | 'home' = 'business';
  emi: number = 0;
  totalInterest: number = 0;
  totalPayable: number = 0;
  businessName: string = '';
  repaymentSchedule: any[] = [];
  groupedSchedule: { [year: string]: any[] } = {};
  groupedYears: { year: string }[] = [];
  expandedRows: { [year: string]: boolean } = {};
  // personalLoanAmount: number = 50000;
  piechartOptions: any;
  applicantName: string = '';
  preventInvalidKeys(event: KeyboardEvent) {
    const invalidKeys = ['e', 'E', '+', '-', ' ', '.', ' '];
    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  preventInvalidPaste(event: ClipboardEvent) {
    const paste = event.clipboardData?.getData('text') || '';
    if (/[^0-9.]/.test(paste)) {
      event.preventDefault();
    }
  }
  limitInputLength(event: Event, field: 'personal' | 'business'): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.slice(0, 8);
    const num = Number(value);
    if (num > 10000000) {
      value = '10000000';
    }
    input.value = value;

    if (field === 'personal') {
      this.loanAmount = Number(value);
    } else if (field === 'business') {
      this.loanAmount = Number(value); // if you're also handling business loan
    }
  }

  limitInterestDecimals(event: Event, field: 'personal'): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Allow only digits and a single decimal point
    value = value.replace(/[^0-9.]/g, '');

    // Only one decimal point allowed
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts[1];
    }

    // Limit to 2 digits after decimal
    if (parts[1]?.length > 2) {
      parts[1] = parts[1].slice(0, 2);
      value = parts.join('.');
    }

    // ✅ Enforce max value of 15 — only if it's a complete number
    if (value !== '' && value !== '.' && !value.endsWith('.')) {
      const num = Number(value);
      if (num > 15) {
        value = '15';
      }
    }

    input.value = value;
    this.interestRate = Number(value) || 0;
  }
  // Restrict the manual input to only numbers <= 4

  // Restrict keys (only allow digits 0-9)
  restrictTenureKeys(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;

    // Allow only numbers and the necessary keys (backspace, delete, etc.)
    if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'Tab') {
      event.preventDefault();
    }

    // If the value is greater than 4, prevent entering more digits
    if (parseInt(value + event.key) > 8) {
      event.preventDefault();
    }
  }

  constructor(private router: Router, private route: ActivatedRoute, private location: Location,) { }

  ngOnInit(): void {
    this.calculateEMI();
    const path = this.route.snapshot.routeConfig?.path;
    if (path?.includes('personal')) this.activeCalculator = 'personal';
    else if (path?.includes('home')) this.activeCalculator = 'home';
    else this.activeCalculator = 'business';
  }
  navigateTo(type: 'business' | 'personal' | 'home') {
    const route = `/calculator/${type}`;
    this.router.navigateByUrl(route);
  }
  // calculateEMI(): void {
  //   const principal = this.loanAmount;
  //   const annualRate = this.interestRate;
  //   const months = this.tenure * 12;
  //   const monthlyRate = annualRate / 12 / 100;

  //   const emi =
  //     (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
  //     (Math.pow(1 + monthlyRate, months) - 1);

  //   this.emi = Math.round(emi);
  //   this.repaymentSchedule = [];
  //   this.groupedSchedule = {};
  //   this.groupedYears = [];

  //   let balance = principal;
  //   let totalInterest = 0;

  //   const startDate = new Date();

  //   for (let i = 0; i < months; i++) {
  //     const interest = Math.round(balance * monthlyRate);
  //     const principalPart = Math.round(this.emi - interest);
  //     totalInterest += interest;
  //     balance -= principalPart;

  //     const monthDate = new Date(startDate);
  //     monthDate.setMonth(startDate.getMonth() + i);
  //     const monthName = monthDate.toLocaleString('default', { month: 'short' });
  //     const year = monthDate.getFullYear();

  //     const row = {
  //       month: `${monthName} ${year}`,
  //       emi: this.emi,
  //       principal: principalPart,
  //       interest: interest,
  //       balance: balance > 0 ? Math.round(balance) : 0
  //     };

  //     if (!this.groupedSchedule[year]) {
  //       this.groupedSchedule[year] = [];
  //       this.groupedYears.push({ year: String(year) });
  //     }
  //     this.groupedSchedule[year].push(row);
  //   }

  //   this.totalInterest = Math.round(totalInterest);
  //   this.totalPayable = Math.round(this.emi * months);

  //   this.updateChart();
  // }
  goBack() {
    this.location.back();
  }
  calculateEMI(): void {
    const principal = this.loanAmount;
    const annualRate = this.interestRate;
    const months = this.tenure * 12;
    const monthlyRate = annualRate / 12 / 100;

    // EMI calculation using diminishing balance formula
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    this.emi = Math.round(emi);
    this.repaymentSchedule = [];
    this.totalInterest = 0;

    let balance = principal;

    for (let i = 1; i <= months; i++) {
      const interestPart = Math.round(balance * monthlyRate);
      const principalPart = Math.round(this.emi - interestPart);
      balance -= principalPart;

      this.totalInterest += interestPart;

      this.repaymentSchedule.push({
        month: `Month ${i}`,
        emi: this.emi,
        principal: principalPart,
        interest: interestPart,
        balance: balance > 0 ? Math.round(balance) : 0
      });
    }

    this.totalPayable = Math.round(this.emi * months);

    this.updateChart(); // If a chart is to be updated
  }

  getYearlyTotal(year: string, field: 'emi' | 'principal' | 'interest'): number {
    return this.groupedSchedule[year].reduce((acc, row) => acc + Number(row[field]), 0);
  }

  toggleRow(year: string): void {
    this.expandedRows[year] = !this.expandedRows[year];
  }

  updateChart() {
    this.piechartOptions = {
      series: [this.loanAmount, this.totalInterest],
      chart: {
        type: 'donut',
        height: 320
      },
      labels: ['Principal', 'Interest'],
      colors: ['#1A2A36', '#4FAF9F'],
      legend: {
        position: 'bottom'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  // generatePDF(): void {
  //   const doc = new jsPDF();
  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const pageHeight = doc.internal.pageSize.getHeight();

  //   const businessName = this.businessName;

  //   // const leftDetails = [
  //   //   `Loan Amount: Rs. ${this.loanAmount}`,
  //   //   `Interest Rate: ${this.interestRate}%`,
  //   //   `Tenure: ${this.tenure} years`
  //   // ];

  //   // const rightDetails = [
  //   //   `Monthly EMI: Rs. ${this.emi}`,
  //   //   `Total Payable: Rs. ${this.totalPayable}`,
  //   //   `Principal: Rs. ${this.loanAmount}`,
  //   //   `Interest: Rs. ${this.totalInterest}`
  //   // ];

  //   const addWatermark = () => {
  //     const centerX = pageWidth / 2;
  //     const centerY = pageHeight / 2;
  //     doc.setFont('helvetica', 'medium');
  //     doc.setTextColor(230, 230, 230); // light gray
  //     doc.setFontSize(60);
  //     doc.text('Fintalk', centerX, centerY, {
  //       angle: 25,
  //       align: 'center',
  //       baseline: 'middle'
  //     });
  //   };
  //   // ✅ 2. Add header (business name)
  //   const addHeader = () => {
  //     doc.setFont('helvetica', 'bold');
  //     doc.setFontSize(18);
  //     doc.setTextColor('#29415B');
  //     doc.text(businessName.toUpperCase(), pageWidth / 2, 15, { align: 'center' });
  //   };


  //   // ✅ 3. Draw header and summary table first
  //   addHeader();
  //   autoTable(doc, {
  //     startY: 30,
  //     margin: { left: 14, right: 14 },
  //     body: [
  //       ['Loan Amount:', `Rs. ${this.loanAmount}`, 'Monthly EMI:', `Rs. ${this.emi}`],
  //       ['Interest Rate (Diminishing):', `${this.interestRate}%`, 'Interest:', `Rs. ${this.totalInterest}`],
  //       ['Tenure:', `${this.tenure} years`, 'Total Payable:', `Rs. ${this.totalPayable}`],
  //     ],
  //     styles: {
  //       fontSize: 10,
  //       font: 'helvetica',
  //       cellPadding: 2,
  //     },
  //     columnStyles: {
  //       0: { fontStyle: 'bold', cellWidth: 40 },
  //       1: { cellWidth: 50 },
  //       2: { fontStyle: 'bold', cellWidth: 40 },
  //       3: { cellWidth: 50 },
  //     },
  //     theme: 'grid',
  //   });
  //   doc.setFontSize(13);
  //   doc.setFont('helvetica', 'bold');
  //   doc.setTextColor('#29415B');
  //   doc.text('Repayment Schedule', 14, 65);
  //   // ✅ 4. Repayment Table
  //   addWatermark();

  //   autoTable(doc, {
  //     head: [[
  //       'S. No.', 'Month', `EMI (Rs.)`, `Principal (Rs.)`, `Interest (Rs.)`, `Balance (Rs.)`
  //     ]],
  //     body: this.repaymentSchedule.map((row, index) => [
  //       index + 1,
  //       row.month,
  //       `${row.emi}`,
  //       `${row.principal}`,
  //       `${row.interest}`,
  //       `${row.balance}`,
  //     ]),
  //     startY: 70,
  //     margin: { top: 25 }, // All other pages will respect this margin
  //     styles: {
  //       fontSize: 9,
  //       font: 'helvetica',
  //     },
  //     headStyles: {
  //       fillColor: [41, 65, 91],
  //       textColor: 255,
  //     },
  //     theme: 'plain',

  //     didDrawPage: () => {
  //       addHeader();
  //       addWatermark();
  //     },
  //   });
  //   doc.save(`${this.businessName.toUpperCase()}-EMI-REPORT.pdf`);
  // }

  generatePDF(): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const businessName = this.businessName;

    const addWatermark = () => {
      const centerX = pageWidth / 2;
      const centerY = pageHeight / 2;
      doc.setFont('helvetica', 'medium');
      doc.setTextColor(230, 230, 230); // light gray
      doc.setFontSize(60);
      doc.text('Fintalk', centerX, centerY, {
        angle: 25,
        align: 'center',
        baseline: 'middle'
      });
    };

    const addHeader = () => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor('#29415B');
      doc.text(businessName.toUpperCase(), pageWidth / 2, 15, { align: 'center' });
    };

    // ✅ Header + Summary table
    addHeader();
    autoTable(doc, {
      startY: 30,
      margin: { left: 14, right: 14 },
      body: [
        ['Loan Amount:', `Rs. ${this.loanAmount}`, 'Monthly EMI:', `Rs. ${this.emi}`],
        ['Interest Rate (Diminishing):', `${this.interestRate}%`, 'Interest:', `Rs. ${this.totalInterest}`],
        ['Tenure:', `${this.tenure} years`, 'Total Payable:', `Rs. ${this.totalPayable}`],
        ['CPP (One Time Charges):', `${this.cppCharges}`, 'PF % On Loan Amount (One Time Charges):', ` ${this.pfAmount}`]
      ],
      styles: {
        fontSize: 10,
        font: 'helvetica',
        cellPadding: 2,
      },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 40 },
        1: { cellWidth: 50 },
        2: { fontStyle: 'bold', cellWidth: 40 },
        3: { cellWidth: 50 },
      },
      theme: 'grid',
    });
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    // ✅ Section title
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#29415B');
    doc.text('Repayment Schedule', 14, finalY);

    // ✅ Repayment table with watermark + header each page
    autoTable(doc, {
      head: [['S. No.', 'Month', `EMI (Rs.)`, `Principal (Rs.)`, `Interest (Rs.)`, `Balance (Rs.)`]],
      body: this.repaymentSchedule.map((row, index) => [
        index + 1,
        row.month,
        `${row.emi}`,
        `${row.principal}`,
        `${row.interest}`,
        `${row.balance}`,
      ]),
      startY: finalY + 5,
      margin: { top: 25 },
      styles: {
        fontSize: 9,
        font: 'helvetica',
      },
      headStyles: {
        fillColor: [41, 65, 91],
        textColor: 255,
      },
      theme: 'plain',

      willDrawPage: () => {   // 👈 FIXED
        addHeader();
        addWatermark();
      },
    });

    doc.save(`${this.businessName.toUpperCase()}-EMI-REPORT.pdf`);
  }
}
