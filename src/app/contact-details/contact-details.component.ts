import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplicationService } from '../loan-application.service';
import { ApiserviceService } from '../apiservice.service';
declare var fbq: Function;
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  standalone: false,
})
export class ContactDetailsComponent implements OnInit {
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<void>();
  isSubmitted = false;
  accountId: any = 1234567;
  // accountId: any = 1270983;
  isOtpSent = false;
  isMobileVerified = false;
  enteredOtp: string = '';
  breadcrumbItems = [
    { label: 'Home', route: '/' },
    { label: 'Apply', route: '/apply' },
    { label: 'Choose Loan Type' },
    { label: 'Business Entity' },
    { label: 'Business Vintage' },
    { label: 'Business Turnover' },
    { label: 'Eligibility' },
    { label: 'Contact Details', isActive: true },
  ];
  loanType: any;
  contactForm: FormGroup;
  sourceFromUrl: string = 'website';
  loading = false;
  gstOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  constructor(
    private fb: FormBuilder,
    private loanService: LoanApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiserviceService,
  ) {
    // Custom validator for optional numeric field
    const numericOrEmptyValidator = (control: any) => {
      if (!control.value || control.value === '') {
        return null; // Field is optional, empty is valid
      }
      return /^[0-9]+$/.test(control.value) ? null : { pattern: true };
    };

    this.contactForm = this.fb.group({
      contactPerson: ['', [Validators.required, Validators.minLength(3)]],
      businessName: [''],
      city: ['', Validators.required],
      loanRequirement: ['', [numericOrEmptyValidator]], // Optional, but if provided must be numeric
      isGstRegistered: ['Yes'], // Optional
      emailId: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      otp: [''],
    });
  }

  ngOnInit(): void {
    this.loanType = this.loanService.getLoanType();
    this.route.queryParams.subscribe((params) => {
      this.sourceFromUrl = params['source'] || 'website';
    });
    this.updateValidatorsBasedOnLoanType();
  }
  updateValidatorsBasedOnLoanType() {
    console.log(this.loanType);
    if (this.loanType === 'businessLoan') {
      this.contactForm
        .get('businessName')
        ?.setValidators([Validators.required]);
    } else {
      this.contactForm.get('businessName')?.clearValidators();
      this.contactForm.get('isGstRegistered')?.clearValidators();
    }

    this.contactForm.get('businessName')?.updateValueAndValidity();
    this.contactForm.get('isGstRegistered')?.updateValueAndValidity();
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
    // const formData = {
    //   ...this.contactForm.value,
    //   eligibility: 'eligible',
    //   productType: this.loanService.getLoanType(),
    //   businessEntity: this.loanService.getEntityType(),
    //   businessVintage: this.loanService.getEntityVintage(),
    //   businessTurnover: this.loanService.getEntityTurnover(),

    //   //pfl
    //   profession: this.loanService.getProfession(),
    //   monthlyIncome: this.loanService.getIncome(),
    //   workExperience: this.loanService.getExperience(),
    //   educationType: this.loanService.getEducationType(),
    //   courseLevel: this.loanService.getCourseLevel(),
    //   companyName: this.loanService.getCompanyName(),
    //   accountId: this.accountId,
    // };

    const productType = this.loanService.getLoanType();

    let extraFields: any = {};

    if (productType === 'businessLoan') {
      extraFields = {
        businessEntity: this.loanService.getEntityType(),
        businessVintage: this.loanService.getEntityVintage(),
        businessTurnover: this.loanService.getEntityTurnover(),
      };
    }

    if (productType === 'personalLoan') {
      extraFields = {
        monthlyIncome: this.loanService.getIncome(),
        workExperience: this.loanService.getExperience(),
        companyName: this.loanService.getCompanyName(),
      };
    }

    if (productType === 'professionalLoans') {
      extraFields = {
        profession: this.loanService.getProfession(),
        monthlyIncome: this.loanService.getIncome(),
        workExperience: this.loanService.getExperience(),
      };
    }

    if (productType === 'educationalLoan') {
      extraFields = {
        educationType: this.loanService.getEducationType(),
        courseLevel: this.loanService.getCourseLevel(),
        monthlyIncome: this.loanService.getIncome(),
      };
    }
    const { otp, ...formValues } = this.contactForm.getRawValue();

    const formData = {
      ...formValues,
      enquirySource: this.sourceFromUrl,
      eligibility: 'eligible',
      productType,
      accountId: this.accountId,
      ...extraFields,
    };
    console.log('Full Loan Application Data:', formData);

    // ✅ Optional: send to backend API
    this.apiService.createEnquiry(formData).subscribe({
      next: (response: any) => {
        // alert(response.message || '✅ Subscribed successfully!');
        this.isSubmitted = true;
        this.submitted.emit(); // Notify parent component
        this.loading = false;
        if (this.sourceFromUrl?.toLowerCase() == 'facebook') {
          fbq('track', 'Lead', { value: 10.0, currency: 'INR' });
          console.log('Facebook Lead Event Fired');
        }
      },
      error: (error: any) => {
        console.error(error);
        const errorMessage =
          error?.error?.message || '❌ Failed to subscribe. Please try again.';
        alert(errorMessage);
        this.loading = false;
      },
    });
  }
  sendOtp() {
    const mobile = this.contactForm.get('mobile')?.value;

    if (!mobile) return;

    this.loading = true;

    this.apiService.sendOtp({ mobile }).subscribe({
      next: (response: any) => {
        alert(response.message || 'OTP sent successfully');
        this.isOtpSent = true;
        this.loading = false;
      },
      error: (error: any) => {
        console.error(error);
        const errorMessage = error?.error?.error || '❌ Failed to send OTP';
        alert(errorMessage);
        this.loading = false;
      },
    });
  }

  verifyOtp() {
    const mobile = this.contactForm.get('mobile')?.value;
    const otp = this.contactForm.get('otp')?.value;

    if (!otp || otp.length !== 4) {
      alert('Please enter valid OTP');
      return;
    }

    this.apiService.verifyOtp({ mobile, otp }).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.isMobileVerified = true;

        // Disable mobile after verify
        this.contactForm.get('mobile')?.disable();
      },
      error: (err: any) => {
        alert(err?.error?.message || 'OTP verification failed');
      },
    });
  }

  goHome() {
    this.router.navigate(['/']); // redirect to home
  }
}
