import { Component, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('productCardsContainer') productCardsContainer!: ElementRef;

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
    'assets/img/clients/mas.png',
    'assets/img/clients/chola.png',
    'assets/img/clients/fed.png',
    'assets/img/clients/finplex.png',
    'assets/img/clients/godrej.png',
    'assets/img/clients/protium.png',
    'assets/img/clients/iifl.png',
    'assets/img/clients/mahindra.png',
    'assets/img/clients/indifi.png',
    'assets/img/clients/kinara.png',
    'assets/img/clients/karur.png',
    'assets/img/clients/lt.png',
    'assets/img/clients/unity.png',
    'assets/img/clients/piramal.png',
    'assets/img/clients/shriram.png',
    'assets/img/clients/credit.png'
  ];

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

  ngOnInit(): void {
    this.setVisibleItems();
  }

  ngAfterViewInit(): void {
    // Only start auto-scroll after the view is initialized
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval); // Clear the interval when the component is destroyed
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setVisibleItems();
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
}
