import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  private collapseInstance: any;

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    // Initialize Bootstrap collapse instance
    if (this.navbarCollapse && typeof bootstrap !== 'undefined') {
      this.collapseInstance = new bootstrap.Collapse(this.navbarCollapse.nativeElement, {
        toggle: false
      });
    }
  }

  scrollToSection(sectionId: string) {
    if (this.router.url === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      });
    }
    this.closeNavbar();
  }

  closeNavbar(): void {
    // Check if navbar is expanded (has 'show' class)
    if (this.navbarCollapse?.nativeElement.classList.contains('show')) {
      if (this.collapseInstance) {
        // Use Bootstrap API
        this.collapseInstance.hide();
      } else {
        // Fallback: direct manipulation
        this.navbarCollapse.nativeElement.classList.remove('show');
        const toggler = document.querySelector('.navbar-toggler') as HTMLElement;
        if (toggler) {
          toggler.setAttribute('aria-expanded', 'false');
        }
      }
    }
  }
}
