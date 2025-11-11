import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
      title: 'Unsecured Loans For Your Business',
      subtitle: 'Fast, Flexible Business Loans from 1L to 5Cr.',
      features: [
        'Repay on your own terms, up to 84 months.',
        '24 Hour Disbursal',
        'No collateral required'
      ],
      button1: 'Apply Now',
      button2: 'Contact Us',
      processSteps: [
        {
          image: 'assets/img/svgs/process/step1.svg',
          title: 'Concept & Strategy',
          text: 'We brainstorm and define your brand’s core vision before starting the creative journey.'
        },
        {
          image: 'assets/img/svgs/process/step2.svg',
          title: 'Creative Design',
          text: 'Our designers craft visuals that align perfectly with your brand identity and message.'
        },
        {
          image: 'assets/img/svgs/process/step3.svg',
          title: 'Development Phase',
          text: 'We build functional, scalable, and responsive solutions tailored to your needs.'
        },
        {
          image: 'assets/img/svgs/process/step4.svg',
          title: 'Launch & Support',
          text: 'After testing and quality checks, we launch your project and provide ongoing support.'
        }
      ],
      processImage: 'assets/img/svgs/bl/frame1.svg',
      images: [
        'assets/img/svgs/bl/frame1.svg',
        'assets/img/svgs/bl/frame3.svg',
        'assets/img/svgs/bl/frame2.svg',
        'assets/img/svgs/bl/frame4.svg',
      ],
      faqs: [
        {
          question: 'What is Fintalk means?',
          answer:
            `Fintalk is trustable digital loaning platform that provides a quick and unsecured
    loans including Business, Personal, Professional, and Educational Loans with a
    fast and clear online process.`
        },
        {
          question: 'Who apply loans in Fintalk?',
          answer:
            `Mostly these loans are applicable for Entrepreneurs, professionals, business
    owners, salaried individuals, and students are apply for these loans, depending
    on their financial needs and eligibility.`
        },
        {
          question: 'How quick can I get a loan Approval?',
          answer:
            `With Fintalk Automated system, loans are approved within 24–48 hours after
    document and credit verification.`
        },
        {
          question: "which documents are needed to apply for loans?",
          answer:
            `simple KYC documents, bank statements, income proofs and business proofs
    are required.`
        },
        {
          question: 'fintalk have data security?',
          answer:
            `Yeah! Fintalk have data security and privacy using innovative encryption
    technology throughout the loan process.`
        },



      ],
      statsData: [
        {
          icon: 'assets/icons/money.png',
          value: '₹13,00,00,000',
          title: '',
          text: 'Corem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          icon: 'assets/icons/customers.png',
          value: '10,000+',
          title: 'Customers',
          text: 'Sorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          icon: 'assets/icons/loans.png',
          value: '25,000+',
          title: 'Loans',
          text: 'Borem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
      ],
    },
    'personal-loan': {
      title: 'Unsecured Loans For Your Business',
      subtitle: 'Fast, Flexible Business Loans from 1L to 5Cr.',
      features: [
        'Repay on your own terms, up to 84 months.',
        '24 Hour Disbursal',
        'No collateral required'
      ],
      button1: 'Apply Now',
      button2: 'Contact Us',
      processSteps: [
        {
          image: 'assets/img/svgs/process/step1.svg',
          title: 'Concept & Strategy',
          text: 'We brainstorm and define your brand’s core vision before starting the creative journey.'
        },
        {
          image: 'assets/img/svgs/process/step2.svg',
          title: 'Creative Design',
          text: 'Our designers craft visuals that align perfectly with your brand identity and message.'
        },
        {
          image: 'assets/img/svgs/process/step3.svg',
          title: 'Development Phase',
          text: 'We build functional, scalable, and responsive solutions tailored to your needs.'
        },
        {
          image: 'assets/img/svgs/process/step4.svg',
          title: 'Launch & Support',
          text: 'After testing and quality checks, we launch your project and provide ongoing support.'
        }
      ],
      processImage: 'assets/img/svgs/bl/frame1.svg',

      images: [
        'assets/img/svgs/pl/frame1.svg',
        'assets/img/svgs/pl/frame3.svg',
        'assets/img/svgs/pl/frame2.svg',
        'assets/img/svgs/pl/frame4.svg',
      ],
      faqs: [
        {
          question: 'What is Fintalk means?',
          answer:
            `Fintalk is trustable digital loaning platform that provides a quick and unsecured
    loans including Business, Personal, Professional, and Educational Loans with a
    fast and clear online process.`
        },
        {
          question: 'Who apply loans in Fintalk?',
          answer:
            `Mostly these loans are applicable for Entrepreneurs, professionals, business
    owners, salaried individuals, and students are apply for these loans, depending
    on their financial needs and eligibility.`
        },
        {
          question: 'How quick can I get a loan Approval?',
          answer:
            `With Fintalk Automated system, loans are approved within 24–48 hours after
    document and credit verification.`
        },
        {
          question: "which documents are needed to apply for loans?",
          answer:
            `simple KYC documents, bank statements, income proofs and business proofs
    are required.`
        },
        {
          question: 'fintalk have data security?',
          answer:
            `Yeah! Fintalk have data security and privacy using innovative encryption
    technology throughout the loan process.`
        },



      ],
      statsData: [
        {
          icon: 'assets/icons/money.png',
          value: '₹13,00,00,000',
          title: '',
          text: 'Corem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          icon: 'assets/icons/customers.png',
          value: '10,000+',
          title: 'Customers',
          text: 'Sorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          icon: 'assets/icons/loans.png',
          value: '25,000+',
          title: 'Loans',
          text: 'Borem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
      ],
    },

    'professional-loan': {
      title: 'Unsecured Loans For Your Business',
      subtitle: 'Fast, Flexible Business Loans from 1L to 5Cr.',
      features: [
        'Repay on your own terms, up to 84 months.',
        '24 Hour Disbursal',
        'No collateral required'
      ],
      button1: 'Apply Now',
      button2: 'Contact Us',
      processSteps: [
        {
          image: 'assets/img/svgs/process/step1.svg',
          title: 'Concept & Strategy',
          text: 'We brainstorm and define your brand’s core vision before starting the creative journey.'
        },
        {
          image: 'assets/img/svgs/process/step2.svg',
          title: 'Creative Design',
          text: 'Our designers craft visuals that align perfectly with your brand identity and message.'
        },
        {
          image: 'assets/img/svgs/process/step3.svg',
          title: 'Development Phase',
          text: 'We build functional, scalable, and responsive solutions tailored to your needs.'
        },
        {
          image: 'assets/img/svgs/process/step4.svg',
          title: 'Launch & Support',
          text: 'After testing and quality checks, we launch your project and provide ongoing support.'
        }
      ],
      processImage: 'assets/img/svgs/bl/frame1.svg',
      images: [
        'assets/img/svgs/pfl/frame1.svg',
        'assets/img/svgs/pfl/frame2.svg',
        'assets/img/svgs/pfl/frame3.svg',
        'assets/img/svgs/pfl/frame4.svg',
      ],
      faqs: [
        {
          question: 'What is Fintalk means?',
          answer:
            `Fintalk is trustable digital loaning platform that provides a quick and unsecured
    loans including Business, Personal, Professional, and Educational Loans with a
    fast and clear online process.`
        },
        {
          question: 'Who apply loans in Fintalk?',
          answer:
            `Mostly these loans are applicable for Entrepreneurs, professionals, business
    owners, salaried individuals, and students are apply for these loans, depending
    on their financial needs and eligibility.`
        },
        {
          question: 'How quick can I get a loan Approval?',
          answer:
            `With Fintalk Automated system, loans are approved within 24–48 hours after
    document and credit verification.`
        },
        {
          question: "which documents are needed to apply for loans?",
          answer:
            `simple KYC documents, bank statements, income proofs and business proofs
    are required.`
        },
        {
          question: 'fintalk have data security?',
          answer:
            `Yeah! Fintalk have data security and privacy using innovative encryption
    technology throughout the loan process.`
        },



      ],
      statsData: [
        {
          icon: 'assets/icons/money.png',
          value: '₹13,00,00,000',
          title: '',
          text: 'Corem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          icon: 'assets/icons/customers.png',
          value: '10,000+',
          title: 'Customers',
          text: 'Sorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          icon: 'assets/icons/loans.png',
          value: '25,000+',
          title: 'Loans',
          text: 'Borem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
      ],
    },

    'education-loan': {
      title: 'Unsecured Loans For Your Business',
      subtitle: 'Fast, Flexible Business Loans from 1L to 5Cr.',
      features: [
        'Repay on your own terms, up to 84 months.',
        '24 Hour Disbursal',
        'No collateral required'
      ],
      button1: 'Apply Now',
      button2: 'Contact Us',
      processSteps: [
        {
          image: 'assets/img/svgs/process/step1.svg',
          title: 'Concept & Strategy',
          text: 'We brainstorm and define your brand’s core vision before starting the creative journey.'
        },
        {
          image: 'assets/img/svgs/process/step2.svg',
          title: 'Creative Design',
          text: 'Our designers craft visuals that align perfectly with your brand identity and message.'
        },
        {
          image: 'assets/img/svgs/process/step3.svg',
          title: 'Development Phase',
          text: 'We build functional, scalable, and responsive solutions tailored to your needs.'
        },
        {
          image: 'assets/img/svgs/process/step4.svg',
          title: 'Launch & Support',
          text: 'After testing and quality checks, we launch your project and provide ongoing support.'
        }
      ],
      processImage: 'assets/img/svgs/bl/frame1.svg',
      images: [
        'assets/img/svgs/bl/frame1.svg',
        'assets/img/svgs/bl/frame3.svg',
        'assets/img/svgs/bl/frame2.svg',
        'assets/img/svgs/bl/frame4.svg',
      ],
      faqs: [
        {
          question: 'What is Fintalk means?',
          answer:
            `Fintalk is trustable digital loaning platform that provides a quick and unsecured
    loans including Business, Personal, Professional, and Educational Loans with a
    fast and clear online process.`
        },
        {
          question: 'Who apply loans in Fintalk?',
          answer:
            `Mostly these loans are applicable for Entrepreneurs, professionals, business
    owners, salaried individuals, and students are apply for these loans, depending
    on their financial needs and eligibility.`
        },
        {
          question: 'How quick can I get a loan Approval?',
          answer:
            `With Fintalk Automated system, loans are approved within 24–48 hours after
    document and credit verification.`
        },
        {
          question: "which documents are needed to apply for loans?",
          answer:
            `simple KYC documents, bank statements, income proofs and business proofs
    are required.`
        },
        {
          question: 'fintalk have data security?',
          answer:
            `Yeah! Fintalk have data security and privacy using innovative encryption
    technology throughout the loan process.`
        },



      ],
      statsData: [
        {
          icon: 'assets/icons/money.png',
          value: '₹13,00,00,000',
          title: '',
          text: 'Corem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          icon: 'assets/icons/customers.png',
          value: '10,000+',
          title: 'Customers',
          text: 'Sorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          icon: 'assets/icons/loans.png',
          value: '25,000+',
          title: 'Loans',
          text: 'Borem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
      ],
    }

  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.content = this.productsContent[this.slug];
  }
  toggleFAQ(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }

}


