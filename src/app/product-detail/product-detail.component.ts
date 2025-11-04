import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent {
  productName: string | null = null;
  productInfo: any;

  productInfoList = [
    {
      id: 'business-loans',
      title: 'Business Loan',
      heading: 'Fuel Your Business Growth with Unsecured Business Loans',
      image: '../../assets/img/products/business.png',
      paragraphs: [
       'A <strong>Business Loan</strong> is a short-term financial solution offered by <strong>Banks and NBFCs</strong>, providing funding of up to <strong>₹50 Lakhs</strong>.',
       'These loans are typically granted for a <strong>maximum tenure of 5 years</strong>, perfect for business growth, working capital, or upgrades.',
       '<strong>Repayment</strong> is done via <strong>EMIs (Equated Monthly Installments)</strong> — so you can become <strong>debt-free in no time</strong>.'
      ],
      stepsTitle: 'Business Loan Process',
      steps: [
        { title: 'Application Submission', description: 'Fill out the online form with basic business and financial information' },
        { title: 'Document Verification', description: 'Our team verifies submitted KYC, financials, and business documents.' },
        { title: 'Credit Evaluation', description: 'We assess your creditworthiness based on CIBIL score, revenue, and liabilities.' },
        { title: 'Loan Sanction', description: 'If eligible, a sanction letter with terms and interest rates is shared with you.' },
        { title: 'Agreement Signing', description: 'You sign the loan agreement digitally or physically based on lender requirements.' },
        { title: 'Disbursal', description: ' The approved loan amount is transferred directly to your business account.' }
      ],
      eligibilityTitle: 'Eligibility Criteria',
      eligibility: [
        'Business vintage of minimum 1 year',
        'Minimum turnover of ₹10 Lakhs per annum',
        'Applicant age: 21 to 65 years',
        'Good credit/CIBIL score (usually above 650)',
        'Registered business entity (Proprietorship, Partnership, LLP, Pvt. Ltd.)'
      ],
      documentsTitle: 'Documents Required',
      documents: [
        'Business registration proof',
        'Bank statements (last 6–12 months)',
        'PAN card & Aadhaar of business owner',
        'Income Tax returns (last 2 years)',
        'GST returns (if applicable)',
        'Business address proof'
      ],
      benefitsTitle: 'Why Choose Us?',
      benefits: [
        '⚡ Fast approvals and disbursals',
        '📝 Minimal paperwork and online processing',
        '🔒 No collateral required',
        '📊 Custom loan solutions based on business size',
        '🤝 Expert support from start to finish'
      ],
      ctaTitle: 'Ready to Expand Your Business?',
      ctaDescription: 'Apply for a hassle-free Business Loan now and fuel your business dreams.',
      ctaLink: '/apply-business-loan',
      ctaButtonText: 'Apply Now'
    },
    {
      id: 'over-draft-limits',
      title: 'Overdraft Facility',
      heading: 'Get Instant Working Capital with Overdraft Facility',
      image: '../../assets/img/products/overdraft.png',
      paragraphs: [
        'An <strong>Overdraft</strong> is a flexible credit facility where businesses can withdraw funds up to a sanctioned limit, even if the account balance is low.',
        'This is ideal for managing short-term cash flow gaps and ensures uninterrupted operations during lean periods.',
        'You pay interest only on the amount utilized, not the entire limit, making it a cost-effective financing option.'
      ],
      stepsTitle: 'Overdraft Application Process',
      steps: [
        { title: 'Submit Application', description: 'Provide basic business and financial details.' },
        { title: 'KYC & Documents', description: 'Upload KYC documents and bank statements.' },
        { title: 'Assessment', description: 'Our team evaluates your financial strength.' },
        { title: 'Sanction Limit', description: 'Receive a sanctioned overdraft limit based on your profile.' },
        { title: 'Activate Facility', description: 'Withdraw funds anytime up to the approved limit.' }
      ],
      eligibilityTitle: 'Eligibility Criteria',
      eligibility: [
        'Minimum 1 year of business operations',
        'Annual turnover of ₹15 Lakhs or more',
        'Valid GST and business registration',
        'Good credit history (CIBIL 650+ preferred)'
      ],
      documentsTitle: 'Documents Required',
      documents: [
        'PAN & Aadhaar of proprietor/director',
        '6 months bank statement',
        'Business registration certificate',
        'Latest ITR and GST returns'
      ],
      benefitsTitle: 'Why Opt for Overdraft?',
      benefits: [
        'Pay interest only on used amount',
        'No fixed EMI burden',
        'Easy top-ups and renewals',
        'Instant fund access for emergencies'
      ],
      ctaTitle: 'Need Working Capital Flexibility?',
      ctaDescription: 'Apply for an Overdraft Facility and manage business finances on your terms.',
      ctaLink: '/apply-overdraft',
      ctaButtonText: 'Apply Now'
    },
    {
      id: 'loan-against-property',
      title: 'Loan Against Property (LAP)',
      heading: 'Leverage Your Property for Bigger Business Growth',
      image: '../../assets/img/products/loan-against-property.png',
      paragraphs: [
        'A <strong>Loan Against Property</strong> allows you to unlock the value of your residential or commercial property for business expansion, working capital, or any large financial requirement.',
        'It offers higher loan amounts at competitive interest rates and longer tenures, making it ideal for strategic investments.',
        'Your property stays with you while you utilize its value to grow your business.'
      ],
      stepsTitle: 'LAP Application Process',
      steps: [
        { title: 'Apply Online', description: 'Share basic property and financial details.' },
        { title: 'Document Collection', description: 'Submit KYC, income proof, and property documents.' },
        { title: 'Property Valuation', description: 'We conduct a legal and technical assessment.' },
        { title: 'Loan Sanction', description: 'Get a sanction letter with the best available terms.' },
        { title: 'Disbursal', description: 'Funds are transferred directly to your account.' }
      ],
      eligibilityTitle: 'Eligibility Criteria',
      eligibility: [
        'Applicant age between 25 to 65 years',
        'Stable income source (business or salaried)',
        'Clear property title and ownership',
        'CIBIL score of 650+ preferred'
      ],
      documentsTitle: 'Documents Required',
      documents: [
        'KYC of applicant & co-applicant',
        'Property papers with approved plans',
        'Last 6 months bank statement',
        'Income proof (ITR, salary slips, etc.)'
      ],
      benefitsTitle: 'Why Choose LAP?',
      benefits: [
        '💰 High loan amounts at low interest',
        '⏳ Long repayment tenures up to 15 years',
        '💸 Use funds for any business or personal need',
        '🏡 Continue using your property'
      ],
      ctaTitle: 'Need a Large Loan at Low Interest?',
      ctaDescription: 'Apply for a Loan Against Property and use your assets to fuel growth.',
      ctaLink: '/apply-lap',
      ctaButtonText: 'Apply Now'
    }
,
{
  id: 'home-loan',
  title: 'Home Loan',
  heading: 'Make Your Dream Home a Reality',
  image: '../../assets/img/products/homeloan.png',
  paragraphs: [
    'A <strong>Home Loan</strong> provides financial assistance to buy, construct, or renovate your dream home.',
    'These loans come with long repayment tenures, attractive interest rates, and tax benefits.',
    'You can apply individually or jointly with a family member to increase eligibility.'
  ],
  stepsTitle: 'Home Loan Process',
  steps: [
    { title: 'Apply', description: 'Submit your application online or at a branch.' },
    { title: 'Document Verification', description: 'Provide income proof, KYC, and property documents.' },
    { title: 'Eligibility Check', description: 'We evaluate your creditworthiness and eligibility.' },
    { title: 'Sanction', description: 'Receive a sanctioned amount with agreed terms.' },
    { title: 'Disbursal', description: 'Funds disbursed as per construction stage or full transfer.' }
  ],
  eligibilityTitle: 'Eligibility Criteria',
  eligibility: [
    'Applicant age: 21 to 65 years',
    'Salaried or self-employed with stable income',
    'Minimum income as per lender norms',
    'Good credit/CIBIL score'
  ],
  documentsTitle: 'Documents Required',
  documents: [
    'KYC documents',
    'Income proof (ITR/salary slips)',
    'Property documents',
    'Bank statements (last 6 months)'
  ],
  benefitsTitle: 'Why Opt for a Home Loan?',
  benefits: [
    '💸 Low interest rates with long tenures',
    '📚 Tax benefits under Section 80C & 24B',
    '🔄 Balance transfer facility for better rates',
    '👫 Joint loan options for higher eligibility'
  ],
  ctaTitle: 'Ready to Own Your Dream Home?',
  ctaDescription: 'Apply now for a hassle-free home loan with expert support.',
  ctaLink: '/apply-home-loan',
  ctaButtonText: 'Apply Now'
}
,
{
  id: 'new-car-loan',
  title: 'New Car Loan',
  heading: 'Own Your Dream Car with a New Car Loan',
  image: '../../assets/img/products/carloan.png',
  paragraphs: [
    '<strong>New Car Loans</strong> offer easy and quick financing to help you buy your dream car hassle-free.',
    'With up to 100% on-road price funding and flexible EMIs, you can drive home your new car without waiting.',
    'Enjoy competitive interest rates and fast approvals with minimal documentation.'
  ],
  stepsTitle: 'New Car Loan Process',
  steps: [
    { title: 'Select Your Car', description: 'Choose the new car you want to buy.' },
    { title: 'Apply Online', description: 'Fill the application form with your details.' },
    { title: 'Upload Documents', description: 'Provide KYC, income proof, and car quotation.' },
    { title: 'Loan Sanction', description: 'Loan approved based on eligibility and documents.' },
    { title: 'Disbursal', description: 'Amount is paid directly to the car dealer.' }
  ],
  eligibilityTitle: 'Eligibility Criteria',
  eligibility: [
    'Applicant age: 21 to 65 years',
    'Salaried or self-employed with stable income',
    'Good credit history (CIBIL 650+ preferred)',
    'Valid ID proof and address proof'
  ],
  documentsTitle: 'Documents Required',
  documents: [
    'KYC documents (PAN, Aadhaar, etc.)',
    'Income proof (salary slips or ITR)',
    'Bank statement – last 6 months',
    'Proforma invoice of the car'
  ],
  benefitsTitle: 'Why Choose a New Car Loan?',
  benefits: [
    '🚗 Up to 100% on-road price funding',
    '💵 Attractive interest rates',
    '📅 Flexible repayment tenure up to 7 years',
    '🚀 Quick disbursal and minimal paperwork'
  ],
  ctaTitle: 'Want to Drive a Brand-New Car?',
  ctaDescription: 'Apply for a New Car Loan and take the driver’s seat with confidence.',
  ctaLink: '/apply-new-car-loan',
  ctaButtonText: 'Apply Now'
}
,
{
  id: 'used-car-loan',
  title: 'Used Car Loan',
  heading: 'Buy a Pre-Owned Car with Flexible Financing',
  image: '../../assets/img/products/used-car-loan.png',
  paragraphs: [
    '<strong>Used Car Loans</strong> are ideal for buying a reliable pre-owned vehicle at affordable EMIs.',
    'These loans offer up to 90% of the car’s value, with simple documentation and fast disbursal.',
    'Suitable for both salaried and self-employed individuals looking for budget-friendly mobility.'
  ],
  stepsTitle: 'Used Car Loan Process',
  steps: [
    { title: 'Select a Car', description: 'Pick the used car you want to purchase.' },
    { title: 'Submit Application', description: 'Fill out a quick loan form with details.' },
    { title: 'Document Collection', description: 'Upload KYC and income proof documents.' },
    { title: 'Car Valuation', description: 'We evaluate the vehicle’s age and condition.' },
    { title: 'Loan Disbursal', description: 'Funds are released post-approval.' }
  ],
  eligibilityTitle: 'Eligibility Criteria',
  eligibility: [
    'Age between 21–65 years',
    'Minimum 1 year of employment/business',
    'Good repayment history',
    'Car should not be older than 10 years'
  ],
  documentsTitle: 'Documents Required',
  documents: [
    'PAN, Aadhaar, and address proof',
    'Income proof (salary slips/ITR)',
    'Bank statement – last 6 months',
    'Car registration papers and RC copy'
  ],
  benefitsTitle: 'Why Choose a Used Car Loan?',
  benefits: [
    '💸 Affordable EMIs and interest rates',
    '⚡ Quick processing and minimal paperwork',
    '🚗 Loans up to 90% of car’s value',
    '⏳ Longer tenures up to 5 years'
  ],
  ctaTitle: 'Looking for a Budget-Friendly Car?',
  ctaDescription: 'Get a Used Car Loan with flexible terms and quick approvals.',
  ctaLink: '/apply-used-car-loan',
  ctaButtonText: 'Apply Now'
}

  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productName = this.route.snapshot.paramMap.get("productName");
    this.productInfo = this.productInfoList.find(
      (product) => product.id === this.productName
    );
  }
}
