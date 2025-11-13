import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  slug: string = '';
  content: any;
  openIndex: number | null = 0; // Default open first FAQ

  productsContent: any = {
    'business-loan': {
      title: 'Is your Business to Grow-Fintalk Here for YOU',
      secondtitle: 'Unsecured Loans For Your Business',
      subtitle: 'Empower your business growth with fast and flexible funding options.',
      features: [
        'Business loans from ₹1 Lakh to ₹5 Crore.',
        'Repay comfortably with flexible tenures up to 84 months.',
        'Instant eligibility check and 24-hour disbursal.',
        'No collateral or security required.'
      ],
      secondheading: `Running or extend a business often need timely financial support. At Fintalk,
we specially made business loan solutions to help Entrepreneurs, Startups,
and small and medium enterprises (SMEs) manage cash flow, put money
into infrastructure, hire staff, purchase catalogue, or expand operations.`,
      processSteps: [
        {
          image: 'assets/img/svgs/process/step1.svg',
          title: 'Apply Online',
          text: 'Submit a simple online application with your basic business and financial details.'
        },
        {
          image: 'assets/img/svgs/process/step2.svg',
          title: 'Quick Verification',
          text: 'Our team reviews your documents instantly to assess your eligibility and loan amount.'
        },
        {
          image: 'assets/img/svgs/process/step3.svg',
          title: 'Instant Approval',
          text: 'Get loan approval within 24 hours based on your business performance and credit profile.'
        },
        {
          image: 'assets/img/svgs/process/step4.svg',
          title: 'Fast Disbursal',
          text: 'Funds are transferred directly to your account so you can focus on growing your business.'
        }
      ],

      processImage: 'assets/img/svgs/bl/frame1.svg',

      images: [
        'assets/img/svgs/bl/frame1.svg',
        'assets/img/svgs/bl/frame2.svg',
        'assets/img/svgs/bl/frame3.svg',
        'assets/img/svgs/bl/frame4.svg'
      ],

      faqs: [
        {
          question: 'What is a Business Loan?',
          answer: 'A business loan helps entrepreneurs and companies access quick funds to manage operations, expand, or meet working capital needs without pledging collateral.'
        },
        {
          question: 'Who can apply for this loan?',
          answer: 'Small business owners, self-employed professionals, startups, and established enterprises with a stable business income can apply.'
        },
        {
          question: 'How fast can I get approval?',
          answer: 'Once you submit your documents and meet basic eligibility, loan approval can be completed within 24-48 hours.'
        },
        {
          question: 'What documents are required?',
          answer: 'KYC documents, business proof, bank statements, and income proof are generally required for verification.'
        },
        {
          question: 'Is my information secure?',
          answer: 'Yes. Your personal and business data are protected with advanced encryption and secure storage systems.'
        }
      ],
      statsSubtitle: `Every number represents a success story — a business empowered, a dream
      funded, a goal achieved.`,
      statsData: [
        {
          icon: 'assets/icons/money.png',
          value: '₹13 Crore+',
          title: 'Funds Disbursed',
          text: 'Helping businesses achieve their goals with quick and reliable funding.'
        },
        {
          icon: 'assets/icons/customers.png',
          value: '10,000+',
          title: 'Happy Customers',
          text: 'Trusted by entrepreneurs and business owners across India.'
        },
        {
          icon: 'assets/icons/loans.png',
          value: '25,000+',
          title: 'Loans Processed',
          text: 'Fast, secure, and transparent loan processing for every business type.'
        }
      ]
    },
    'personal-loan': {
      title: 'Turn Your Dreams Into Reality with Fintalk',
      secondtitle: 'Personal Loans Made Simple and Fast',
      subtitle: 'Get instant financial support for any personal need — without collateral or lengthy paperwork.',
      features: [
        'Personal loans from ₹50,000 to ₹25 Lakh.',
        'Flexible repayment tenure up to 60 months.',
        'Quick approval and 24-hour disbursal.',
        'No security or guarantor required.'
      ],
      secondheading: `Whether it’s for medical emergencies, home renovation, education, travel, or debt consolidation — Fintalk’s Personal Loan offers you the freedom to fulfill your needs instantly. Enjoy quick approvals, minimal documentation, and flexible repayment options that fit your lifestyle.`,

      processSteps: [
        {
          image: 'assets/img/svgs/process/step1.svg',
          title: 'Check Eligibility',
          text: 'Enter your income and basic details to check your eligibility instantly.'
        },
        {
          image: 'assets/img/svgs/process/step2.svg',
          title: 'Submit Documents',
          text: 'Upload simple KYC documents and income proof through our secure portal.'
        },
        {
          image: 'assets/img/svgs/process/step3.svg',
          title: 'Get Instant Approval',
          text: 'Our system evaluates your profile and provides approval within 24 hours.'
        },
        {
          image: 'assets/img/svgs/process/step4.svg',
          title: 'Receive Funds',
          text: 'Loan amount is credited directly to your bank account for immediate use.'
        }
      ],

      processImage: 'assets/img/svgs/pl/frame1.svg',

      images: [
        'assets/img/svgs/pl/frame1.svg',
        'assets/img/svgs/pl/frame2.svg',
        'assets/img/svgs/pl/frame3.svg',
        'assets/img/svgs/pl/frame4.svg'
      ],

      faqs: [
        {
          question: 'What is a Personal Loan?',
          answer: 'A personal loan is an unsecured loan that helps you meet personal financial needs such as medical emergencies, education, travel, or home renovation.'
        },
        {
          question: 'Who is eligible to apply?',
          answer: 'Salaried individuals, self-employed professionals, and business owners with a steady income can apply for a personal loan.'
        },
        {
          question: 'How soon will I get the funds?',
          answer: 'With minimal documentation and instant processing, funds can be disbursed within 24 hours after approval.'
        },
        {
          question: 'What documents are required?',
          answer: 'You need to provide basic KYC documents, bank statements, and proof of income or salary slips.'
        },
        {
          question: 'Is my data safe with Fintalk?',
          answer: 'Yes, all your data is protected using advanced encryption and privacy measures to ensure complete security.'
        }
      ],

      statsSubtitle: `Every number tells a story of trust, growth, and dreams fulfilled — powered by Fintalk’s simple and transparent lending process.`,

      statsData: [
        {
          icon: 'assets/icons/money.png',
          value: '₹8 Crore+',
          title: 'Funds Disbursed',
          text: 'Empowering individuals to achieve their personal goals with ease.'
        },
        {
          icon: 'assets/icons/customers.png',
          value: '7,500+',
          title: 'Happy Borrowers',
          text: 'Thousands of customers rely on Fintalk for quick and hassle-free personal loans.'
        },
        {
          icon: 'assets/icons/loans.png',
          value: '15,000+',
          title: 'Loans Processed',
          text: 'Fast, transparent, and flexible personal loan solutions for every need.'
        }
      ]
    }
    ,

    'professional-loan': {
      title: 'Empower Your Career with Fintalk',
      secondtitle: 'Professional Loans for Doctors, CAs, Architects & More',
      subtitle: 'Flexible financing designed for professionals to grow their practice and achieve success.',
      features: [
        'Loans from ₹1 Lakh to ₹50 Lakh for working professionals.',
        'Hassle-free documentation and instant eligibility check.',
        'Flexible repayment tenure up to 84 months.',
        'No collateral or guarantor required.'
      ],
      secondheading: `Fintalk’s Professional Loan is crafted to help skilled professionals — such as doctors, chartered accountants, architects, consultants, and freelancers — expand their practice, upgrade equipment, or manage cash flow. With easy approvals and quick disbursals, we make financing simpler for achievers like you.`,

      processSteps: [
        {
          image: 'assets/img/svgs/process/step1.svg',
          title: 'Submit Your Details',
          text: 'Provide basic personal and professional details to initiate your loan application.'
        },
        {
          image: 'assets/img/svgs/process/step2.svg',
          title: 'Upload Documents',
          text: 'Upload your KYC, income proof, and professional credentials securely online.'
        },
        {
          image: 'assets/img/svgs/process/step3.svg',
          title: 'Instant Evaluation',
          text: 'Our advanced system evaluates your profile and credit score instantly.'
        },
        {
          image: 'assets/img/svgs/process/step4.svg',
          title: 'Get Funded',
          text: 'Receive your approved loan amount directly in your account within 24 hours.'
        }
      ],

      processImage: 'assets/img/svgs/pfl/frame1.svg',

      images: [
        'assets/img/svgs/pfl/frame1.svg',
        'assets/img/svgs/pfl/frame2.svg',
        'assets/img/svgs/pfl/frame3.svg',
        'assets/img/svgs/pfl/frame4.svg'
      ],

      faqs: [
        {
          question: 'What is a Professional Loan?',
          answer: 'A professional loan is a customized financial solution for self-employed professionals to expand their practice, upgrade tools, or manage working capital needs.'
        },
        {
          question: 'Who can apply for a Professional Loan?',
          answer: 'Doctors, chartered accountants, architects, consultants, and other licensed professionals with a stable income can apply.'
        },
        {
          question: 'How long does approval take?',
          answer: 'Fintalk offers instant eligibility checks and approvals within 24–48 hours after document verification.'
        },
        {
          question: 'What are the required documents?',
          answer: 'KYC documents, professional certificates, bank statements, and income proofs are required.'
        },
        {
          question: 'Do I need to provide collateral?',
          answer: 'No. Our professional loans are completely unsecured — no collateral or guarantor needed.'
        }
      ],

      statsSubtitle: `Thousands of professionals trust Fintalk to fuel their ambitions — helping them grow, innovate, and lead in their fields.`,

      statsData: [
        {
          icon: 'assets/icons/money.png',
          value: '₹9 Crore+',
          title: 'Loans Disbursed',
          text: 'Supporting professionals across industries with quick and reliable financing.'
        },
        {
          icon: 'assets/icons/customers.png',
          value: '6,000+',
          title: 'Happy Professionals',
          text: 'Trusted by experts who rely on Fintalk to finance their growth journey.'
        },
        {
          icon: 'assets/icons/loans.png',
          value: '12,000+',
          title: 'Loans Processed',
          text: 'Simplifying financial access for India’s skilled professionals.'
        }
      ]
    }
    ,

    'education-loan': {
      title: 'Invest in Your Future with Fintalk',
      secondtitle: 'Education Loans Made Simple & Accessible',
      subtitle: 'Empowering students to pursue their dreams with flexible and affordable education financing.',
      features: [
        'Education loans from ₹50,000 to ₹25 Lakh.',
        'Covers tuition, living, travel, and study material expenses.',
        'Flexible repayment options after course completion.',
        'Quick approval with minimal documentation.'
      ],
      secondheading: `At Fintalk, we believe education should never be limited by finances. Our education loan solutions are designed to support students in pursuing higher studies — in India or abroad — without financial stress. With fast approvals, transparent processing, and flexible repayment, we make your learning journey easier.`,

      processSteps: [
        {
          image: 'assets/img/svgs/process/step1.svg',
          title: 'Apply Online',
          text: 'Submit your basic academic and financial details through our quick online form.'
        },
        {
          image: 'assets/img/svgs/process/step2.svg',
          title: 'Submit Documents',
          text: 'Provide KYC documents, admission proof, and academic records for easy verification.'
        },
        {
          image: 'assets/img/svgs/process/step3.svg',
          title: 'Get Instant Approval',
          text: 'Once verified, your education loan gets approved within 24–48 hours.'
        },
        {
          image: 'assets/img/svgs/process/step4.svg',
          title: 'Receive Funds',
          text: 'Funds are disbursed directly to your institution or account as per requirement.'
        }
      ],

      processImage: 'assets/img/svgs/bl/frame1.svg',

      images: [
        'assets/img/svgs/bl/frame1.svg',
        'assets/img/svgs/bl/frame2.svg',
        'assets/img/svgs/bl/frame3.svg',
        'assets/img/svgs/bl/frame4.svg'
      ],

      faqs: [
        {
          question: 'What is an Education Loan?',
          answer: 'An education loan provides financial support to students pursuing higher studies in India or abroad, covering tuition, travel, and living expenses.'
        },
        {
          question: 'Who can apply for an Education Loan?',
          answer: 'Students above 18 years or their parents/guardians can apply, depending on eligibility and course enrollment.'
        },
        {
          question: 'What expenses are covered?',
          answer: 'Tuition fees, hostel charges, travel expenses, books, and study materials are all covered under Fintalk’s education loans.'
        },
        {
          question: 'When does repayment start?',
          answer: 'Repayment begins after course completion or once the student gains employment, ensuring financial flexibility.'
        },
        {
          question: 'Is collateral required?',
          answer: 'No collateral is needed for smaller loan amounts. For higher amounts, minimal documentation and co-applicant support may be required.'
        }
      ],

      statsSubtitle: `Every loan we provide opens the door to new opportunities — helping students build brighter futures across the world.`,

      statsData: [
        {
          icon: 'assets/icons/money.png',
          value: '₹5 Crore+',
          title: 'Funds Disbursed',
          text: 'Supporting students in achieving their academic goals in India and abroad.'
        },
        {
          icon: 'assets/icons/customers.png',
          value: '3,000+',
          title: 'Students Supported',
          text: 'Proudly helping learners take the next big step in their educational journey.'
        },
        {
          icon: 'assets/icons/loans.png',
          value: '6,500+',
          title: 'Loans Processed',
          text: 'Fast, transparent, and student-friendly education loan processing.'
        }
      ]
    }

  };

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.content = this.productsContent[this.slug];
  }
  toggleFAQ(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
  scrollToSection(sectionId: string) {
    if (this.router.url === '/') {
      // Already on home page → scroll directly
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home first, then scroll after navigation completes
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300); // wait for DOM to render
      });
    }
  }
}


