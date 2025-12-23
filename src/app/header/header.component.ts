import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BootstrapLoaderService } from '../bootstrap-loader.service';

declare var bootstrap: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  private collapseInstance: any;

  constructor(
    private router: Router,
    private bootstrapLoader: BootstrapLoaderService
  ) { }

  ngAfterViewInit(): void {
    // Defer Bootstrap JS loading to after initial render for better LCP
    // Use requestIdleCallback for non-critical initialization
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        this.loadBootstrap();
      }, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => this.loadBootstrap(), 100);
    }
  }

  private loadBootstrap(): void {
    // Load Bootstrap JS dynamically (non-blocking)
    this.bootstrapLoader.loadBootstrap().then((bootstrap) => {
      // Initialize Bootstrap collapse instance after Bootstrap loads
      if (this.navbarCollapse && bootstrap) {
        this.collapseInstance = new bootstrap.Collapse(this.navbarCollapse.nativeElement, {
          toggle: false
        });
      }
    }).catch(() => {
      // Fallback: Bootstrap failed to load, use manual toggle
      // Silently fail - no console.warn to avoid blocking
    });
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
