import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  isSubmitted = false;

  breadcrumbItems = [ 
    { label: 'Home', route: '/' },
    { label: 'Apply', route: '/apply' },
    { label: 'Choose Loan Type' },
    { label: 'Business Entity' },
    { label: 'Business Vintage' },
    { label: 'Business Turnover' },
    { label: 'Eligibility' },
    { label: 'Contact Details', isActive: true }
  ];

  contactForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      businessName: ['', Validators.required],
      city: ['', Validators.required],
      loanAmount: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      gstRegistered: ['Yes', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+91\s?\d{10}$/)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted successfully', this.contactForm.value);
      // Simulate a short delay or API call
      setTimeout(() => {
        this.isSubmitted = true;
      }, 500);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
  goHome() {
    this.router.navigate(['/']); // redirect to home
  }
}
