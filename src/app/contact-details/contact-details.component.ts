import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanApplicationService } from '../loan-application.service';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<void>();
  isSubmitted = false;
  accountId: any = 1270983;
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
  loading = false;
  gstOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];

  constructor(private fb: FormBuilder, private loanService: LoanApplicationService, private router: Router, private apiService: ApiserviceService) {
    // Custom validator for optional numeric field
    const numericOrEmptyValidator = (control: any) => {
      if (!control.value || control.value === '') {
        return null; // Field is optional, empty is valid
      }
      return /^[0-9]+$/.test(control.value) ? null : { pattern: true };
    };

    this.contactForm = this.fb.group({
      contactPerson: ['', [Validators.required, Validators.minLength(3)]],
      businessName: ['', Validators.required],
      // city: ['', Validators.required],
      loanRequirement: ['', [numericOrEmptyValidator]], // Optional, but if provided must be numeric
      isGstRegistered: ['Yes'], // Optional
      emailId: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\+91\s?\d{10}$/)]]
    });
  }

  // onSubmit() {
  //   if (this.contactForm.valid) {
  //     console.log('Form submitted successfully', this.contactForm.value);
  //     // Simulate a short delay or API call
  //     setTimeout(() => {
  //       this.isSubmitted = true;
  //     }, 500);
  //   } else {
  //     this.contactForm.markAllAsTouched();
  //   }
  // }

  onSubmit() {
    console.log(this.contactForm.value);
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    // ✅ Combine contact form + service data
    const formData = {
      ...this.contactForm.value,
      eligibility: "eligible",
      productType: this.loanService.getLoanType(),
      businessEntity: this.loanService.getEntityType(),
      businessVintage: this.loanService.getEntityVintage(),
      businessTurnover: this.loanService.getEntityTurnover(),
      accountId: this.accountId
    };

    console.log('Full Loan Application Data:', formData);

    // ✅ Optional: send to backend API
    this.apiService.createEnquiry(formData).subscribe({
      next: (response: any) => {
        // alert(response.message || '✅ Subscribed successfully!');
        this.isSubmitted = true;
        this.submitted.emit(); // Notify parent component
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
  goHome() {
    this.router.navigate(['/']); // redirect to home
  }
}
