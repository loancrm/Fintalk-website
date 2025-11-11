import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  subscribeForm!: FormGroup;

  // resources = ['About', 'Products', 'Process', 'Career'];
  resources = [
    { label: 'About', sectionId: 'aboutUs' },
    { label: 'Products', sectionId: 'products' },
    { label: 'Process', sectionId: 'process' },
    { label: 'Contact Us', sectionId: 'contactus' }
  ];

  help = [
    { label: 'Frequently Asked Questions', sectionId: 'faq' },
    { label: 'Terms & Conditions', sectionId: 'products' },
    // { label: 'Privacy Policy', sectionId: 'process' },
    // { label: 'Cookie Policy', sectionId: 'contactus' }
  ];
  // help = ['Frequently Asked Questions', 'Terms & Conditions', 'Privacy Policy', 'Cookie Policy'];
  // services = ['Business Loans', 'Professional Loans', 'Personal Loans', 'Education Loans'];
  services = [
    { label: 'Business Loans ', sectionId: 'business-loan' },
    { label: 'Professional Loans', sectionId: 'professional-loan' },
    { label: 'Personal Loans', sectionId: 'personal-loan' },
    { label: 'Educational Loans', sectionId: 'education-loan' }
  ];

  loading = false;
  message = '';
  accountId: any = 1270983;
  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private apiService: ApiserviceService) { }
  ngOnInit(): void {
    this.subscribeForm = this.fb.group({
      name: ['', [Validators.required]],
        emailAddress: ['', [Validators.required, Validators.email]]
    });
  }
  // onSubmit(event: Event) {
  //   event.preventDefault();
  //   this.loading = true;
  //   this.message = '';

  //   const form = event.target as HTMLFormElement;
  //   const fullNameInput = form.querySelector('input[type="text"]') as HTMLInputElement;
  //   const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;

  //   const fullName = fullNameInput?.value.trim();
  //   const email = emailInput?.value.trim();

  //   if (!fullName || !email) {
  //     this.message = 'Please fill in all required fields.';
  //     this.loading = false;
  //     return;
  //   }

  //   // Replace with your actual API endpoint
  //   const apiUrl = 'https://yourapi.com/newsletter/subscribe';
  //   const formData = { name: fullName, email: email };

  //   this.http.post(apiUrl, formData).subscribe({
  //     next: () => {
  //       this.message = 'Thank you for subscribing!';
  //       form.reset();
  //     },
  //     error: () => {
  //       this.message = 'Something went wrong. Please try again later.';
  //     },
  //     complete: () => {
  //       this.loading = false;
  //     }
  //   });
  // }

  onSubmit(): void {
    if (this.subscribeForm.invalid) {
      this.subscribeForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    // const formData = this.subscribeForm.value;
    const formData = {
      ...this.subscribeForm.value,  // spread existing form fields
      accountId: this.accountId     // add accountId manually
    };
    this.apiService.subscribeUser(formData).subscribe({
      next: (response: any) => {
        alert(response.message || '✅ Subscribed successfully!');
        this.subscribeForm.reset();
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
  // scrollToSection(sectionId: string) {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // }

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
  goToProduct(product: any) {
    console.log(product);
    this.router.navigate(['/products', product]);
  }
}
