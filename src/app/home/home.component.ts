import { Component, HostListener, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
SwiperCore.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('productCardsContainer') productCardsContainer!: ElementRef;
  products = [
    {
      title: 'Business Loans',
      slug: 'business-loan',
      icon: 'assets/img/svgs/business.svg',
      description: 'Access fast and reliable business loans that support entrepreneurs to grow, develop, and manage operations effortlessly.'
    },
    {
      title: 'Personal Loans',
      slug: 'personal-loan',
      icon: 'assets/img/svgs/personal.svg',
      description: 'Quick, support for personal needs, emergencies, or lifestyle needs.'
    },
    {
      title: 'Professional Loans',
      slug: 'professional-loan',
      icon: 'assets/img/svgs/professional.svg',
      description: 'This is Planned for engineers, chartered accountants, doctors and other specialists to support their professions or practices.'
    },
    {
      title: 'Educational Loans',
      slug: 'education-loan',
      icon: 'assets/img/svgs/educational.svg',
      description: 'Helping students who are pursuing quality education in India or abroad with simple and manageable repayment opportunities.'
    }
  ];

  steps = [
    {
      title: 'Fill the Application Form',
      description: 'Submit your simple online application in minutes and start your loan journey quickly, professionally, and without any difficult forms.',
      icon: 'assets/img/svgs/fill.svg'
    },
    {
      title: 'Upload Documents',
      description: 'Submit your required documents online with comfort and secure, ensuring a smooth and fast loan approval process.',
      icon: 'assets/img/svgs/upload.svg'
    },
    {
      title: 'Credit Analysis',
      description: 'Our team carefully examine your financial profile, credit history, and income to confirm the right loan solution for your needs.',
      icon: 'assets/img/svgs/credit.svg'
    },
    {
      title: 'Loan Approval',
      description: 'After confirmation of documents and credits, get fast and transparent loan approval, and verifying timely access to your funds.',
      icon: 'assets/img/svgs/approval.svg'
    }
  ];
  testimonials = [
    {
      text: `My Loan process was completed simple with Fintalk. From application to
approval, everything was smooth and transparent. I received my business loan
within 48 hours.`,
      name: 'Ramesh',
      position: 'Business Owner, Secunderabad'
    },
    {
      text: `I am a doctor; I need quick financial support for my training. Fintalk’s team was
helpful and well-organized the entire process was smooth and stress-free.`,
      name: 'Priya',
      position: 'Doctor, Vizag'
    },
    {
      text: `Fintalk identifies what business owner’s requirement. The flexible repayment
options and quick approvals helped me to expand my operations without any
disturbance.`,
      name: 'Tharun',
      position: 'Entrepreneur, Mumbai'
    },
    {
      text: `I applied for an education loan through Fintalk that was shocked at how fast and
easy it was. Their guidance made my study abroad journey possible.`,
      name: 'Venkatesh',
      position: 'Student, AP'
    }
  ];

  currentIndex = 1; // Start at 1 because index 0 is the cloned last slide
  intervalId: any;
  contactForm!: FormGroup;
  isTransitioning = true;
  scrollResumeTimeout: any;
  images: string[] = [
    'assets/img/clients/hdfc.png',
    'assets/img/clients/scb.png',
    'assets/img/clients/icici.png',
    'assets/img/clients/kotak.png',
    'assets/img/clients/axis.png',
    'assets/img/clients/yes.png',
    'assets/img/clients/bajaj.png',
    'assets/img/clients/smfg.png',
    'assets/img/clients/ugro.png',
    'assets/img/clients/aditya.png',
    'assets/img/clients/idfc.png',
    'assets/img/clients/indus.png',
    'assets/img/clients/tata.png',
    'assets/img/clients/muthoot.png',
    'assets/img/clients/lending.png',
    'assets/img/clients/neo.png',
    'assets/img/clients/edel.png',
    'assets/img/clients/clix.png',
    'assets/img/clients/hero.png',
    'assets/img/clients/poona.png',
    'assets/img/clients/arka.png',
    'assets/img/clients/bandhan.png',
    // 'assets/img/clients/mas.png',
    'assets/img/clients/chola.png',
    'assets/img/clients/fed.png',
    'assets/img/clients/finplex.png',
    'assets/img/clients/godrej.png',
    'assets/img/clients/protium.png',
    'assets/img/clients/iifl.png',
    // 'assets/img/clients/mahindra.png',
    'assets/img/clients/indifi.png',
    // 'assets/img/clients/kinara.png',
    'assets/img/clients/karur.png',
    'assets/img/clients/lt.png',
    // 'assets/img/clients/unity.png',
    'assets/img/clients/piramal.png',
    'assets/img/clients/shriram.png',
    // 'assets/img/clients/credit.png'
  ];
  openIndex: number | null = 0; // Default open first FAQ

  faqs = [
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
    {
      question: 'Can I apply for a loan through online?',
      answer:
        `sure. You can apply through online in our website fill a simple application form,
upload documents, and get immediate updates on your loan status.`
    },
    {
      question: 'How much loan amount can I get?',
      answer:
        `Dependent on eligibility and profits, you can get a loan amount ranging from
₹10 Lakhs to ₹10 Cr for personal or business needs.`
    },
    {
      question: 'can I check my loan status online?',
      answer:
        `Yes! you can easily track your loan application status online or connect with our
backing team for real-time updates.`
    },
    {
      question: 'startups or new businesses apply for these loans?',
      answer:
        `Absolutely. Fintalk support startups and businesses by providing the flexible
and quick business loan options with minimal documentation.`
    }
  ];
  loading = false;
  message = '';

  formData = {
    name: '',
    email: '',
    mobile: ''
  };

  services = [
    { name: 'Business Loans', selected: false },
    { name: 'Personal Loans', selected: false },
    { name: 'Educational Loans', selected: false },
    { name: 'Professional Loans', selected: false }
  ];
  accountId: any = 1270983;
  // Product Cards Data
  productCards = [
    { title: 'Business Loan', description: 'A Business loan is a term loan offered by Banks/NBFCs for amounts up to 50 Lakhs, generally for short tenures of up to 5 years.', imageUrl: 'assets/img/productimagsss.svg' },
    { title: 'Personal Loan', description: 'A Business loan is a term loan offered by Banks/NBFCs for amounts up to 50 Lakhs, generally for short tenures of up to 5 years.', imageUrl: 'assets/img/productimagsss.svg' },
    { title: 'Educational Loan', description: 'A Business loan is a term loan offered by Banks/NBFCs for amounts up to 50 Lakhs, generally for short tenures of up to 5 years.', imageUrl: 'assets/img/productimagsss.svg' },
    { title: 'Over Draft Limit', description: 'A Business loan is a term loan offered by Banks/NBFCs for amounts up to 50 Lakhs, generally for short tenures of up to 5 years.', imageUrl: 'assets/img/productimagsss.svg' },
    { title: 'Professional Loan', description: 'A Business loan is a term loan offered by Banks/NBFCs for amounts up to 50 Lakhs, generally for short tenures of up to 5 years.', imageUrl: 'assets/img/productimagsss.svg' }
  ];

  currentCardIndex = 0; // The index of the current card being viewed
  scrollInterval: any; // Interval for auto-scrolling
  numVisibleItems: number = 1;
  constructor(private http: HttpClient, private apiService: ApiserviceService, private router: Router, private fb: FormBuilder, private api: ApiserviceService) { }
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.pattern(/^[0-9]{10}$/)],
    });
    this.setVisibleItems();
    this.startAutoSlide();
  }
  onServiceChange(service: any) {
    service.selected = !service.selected;
  }

  ngAfterViewInit(): void {
    // Only start auto-scroll after the view is initialized
    this.startAutoScroll();
    // Initialize transition state
    setTimeout(() => {
      this.isTransitioning = true;
    }, 50);
  }

  pauseScroll() {
    const scrollContent = document.querySelector('.scroll-content') as HTMLElement;
    if (scrollContent) {
      scrollContent.style.animationPlayState = 'paused';
    }
    // Clear any existing resume timeout
    if (this.scrollResumeTimeout) {
      clearTimeout(this.scrollResumeTimeout);
    }
  }

  resumeScroll() {
    // Resume after 2 seconds delay
    this.scrollResumeTimeout = setTimeout(() => {
      const scrollContent = document.querySelector('.scroll-content') as HTMLElement;
      if (scrollContent) {
        scrollContent.style.animationPlayState = 'running';
      }
    }, 2000); // 2 second delay
  }

  ngOnDestroy(): void {
    if (this.scrollResumeTimeout) {
      clearTimeout(this.scrollResumeTimeout);
    }
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval); // Clear the interval when the component is destroyed
    }
    clearInterval(this.intervalId);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setVisibleItems();
  }
  toggleFAQ(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
  setVisibleItems(): void {
    const width = window.innerWidth;

    if (width >= 1200) {
      this.numVisibleItems = 6; // large screens
    } else if (width >= 992) {
      this.numVisibleItems = 5; // medium screens
    } else if (width >= 768) {
      this.numVisibleItems = 4; // tablets
    } else if (width >= 576) {
      this.numVisibleItems = 3; // small devices
    } else {
      this.numVisibleItems = 2; // extra small
    }
  }

  startAutoScroll(): void {
    this.scrollInterval = setInterval(() => {
      this.showNextCard(); // Show the next card every 3 seconds
    }, 9000); // Adjust this duration as per your requirement
  }

  showNextCard(): void {
    this.currentCardIndex = (this.currentCardIndex + 1) % this.productCards.length;
    this.scrollToCurrentCard();
  }

  // Scroll to the current card
  scrollToCurrentCard(): void {
    if (this.productCardsContainer) {
      const container = this.productCardsContainer.nativeElement;
      const currentCard = container.children[this.currentCardIndex];
      container.scrollTop = currentCard.offsetTop; // Scroll to the card
    }
  }


  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  nextSlide() {
    this.isTransitioning = true;
    this.currentIndex++;

    // If we've reached the cloned first slide (last position), jump to real first slide
    if (this.currentIndex >= this.testimonials.length + 1) {
      setTimeout(() => {
        this.isTransitioning = false;
        this.currentIndex = 1; // Jump to real first slide
      }, 600);
    }
  }
  goToProduct(product: any) {
    this.router.navigate(['/products', product.slug]);
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
  prevSlide() {
    this.isTransitioning = true;
    this.currentIndex--;

    // If we've reached the cloned last slide (position 0), jump to real last slide
    if (this.currentIndex <= 0) {
      setTimeout(() => {
        this.isTransitioning = false;
        this.currentIndex = this.testimonials.length; // Jump to real last slide
      }, 600);
    }
  }

  goToSlide(index: number) {
    this.isTransitioning = true;
    this.currentIndex = index + 1; // +1 because index 0 is cloned last slide
    // Reset transition after animation completes
    setTimeout(() => {
      this.isTransitioning = true;
    }, 600);
  }

  getDisplayIndex(): number {
    // Convert internal index (which includes cloned slides) to display index
    if (this.currentIndex === 0) {
      return this.testimonials.length - 1; // Cloned last slide shows last testimonial
    } else if (this.currentIndex > this.testimonials.length) {
      return 0; // Cloned first slide shows first testimonial
    }
    return this.currentIndex - 1; // Real slides are offset by 1
  }
  onSubmit() {
    console.log(this.contactForm.value);
    if (this.contactForm.invalid) return;

    this.loading = true;
    this.message = '';

    const selectedServices = this.services
      .filter(s => s.selected)
      .map(s => s.name);

    const formData = {
      ...this.contactForm.value,
      services: selectedServices,
      accountId: this.accountId
    };

    this.apiService.createContactRequests(formData).subscribe({
      next: (res: any) => {
        alert(res.message || 'Thank you for contacting us!');
        this.contactForm.reset();
        this.services.forEach(s => (s.selected = false));
        this.loading = false;
      },
      error: (error: any) => {
        console.error(error);
        const errorMessage = error?.error?.message || '❌ Failed to subscribe. Please try again.';
        alert(errorMessage);
        this.loading = false;
      }
    });
  }




}
