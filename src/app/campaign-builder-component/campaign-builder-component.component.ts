import { Component, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
interface Question {
  id: string;
  label: string;
  type: 'text' | 'select';
  ph?: string;
  options?: string[];
}

interface Group {
  title: string;
  subtitle: string;
  questions: Question[];
}

interface LoanConfig {
  title: string;
  subtitle: string;
  groups: Group[];
}

@Component({
  selector: 'app-campaign-builder-component',
  templateUrl: './campaign-builder-component.component.html',
  styleUrl: './campaign-builder-component.component.scss',
  standalone: false
})
export class CampaignBuilderComponentComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  selectedLoan: string | null = null;
  currentGroupIndex = 0;
  answers: Record<string, any> = {};
  isSubmitted = false;
  isSubmitting = false;
  showErrors = false;
  referenceId = '';
  enquirySource: string = 'Website';
  // ─── OTP State ─────────────────────────────────────────────
  mobileOtpSent        = false;
  mobileOtpVerified    = false;
  sendingMobileOtp     = false;
  verifyingMobileOtp   = false;
  mobileResendCooldown = 0;
  mobileOtp            = '';

  showEligibilityPopup = false;
  eligibilityMessage = '';
  fieldErrors: Record<string, string> = {};

  private mobileTimer?: ReturnType<typeof setInterval>;

  features = [
    { icon: '⚡', title: 'Instant Decision',   desc: 'AI approves in under 60 seconds' },
    { icon: '🏦', title: '40+ Banks',           desc: 'Nationwide lender network' },
    { icon: '🔒', title: 'Bank-Grade Security', desc: '256-bit encryption, RBI compliant' },
  ];

  loanConfigs: Record<string, LoanConfig> = {
    personal: {
      title: 'Personal Loan',
      subtitle: 'Quick unsecured financing for your needs',
      groups: [
        {
          title: 'Company Details',
          subtitle: 'Tell us about your job',
          questions: [
            { id: 'company', label: 'Company Name', type: 'text' },
            {
              id: 'duration',
              label: 'How many years of work experience do you have?',
              type: 'select',
              options: ['0-1 Year', '1-2 Years', '2-3 Years', '3-4 Years', '5+ Years']
            },
            { id: 'salary', label: 'Monthly Salary', type: 'text' },
            {
              id: 'hasEmi',
              label: 'Do you have any EMI?',
              type: 'select',
              options: ['Yes', 'No']
            },
            { id: 'emiAmount', label: 'Enter your total monthly EMI amount.', type: 'text' },
            {
              id: 'payslip',
              label: 'Does your company provide payslips?',
              type: 'select',
              options: ['Yes', 'No']
            },
            {
              id: 'salaryBank',
              label: 'Salary credited to bank account?',
              type: 'select',
              options: ['Yes', 'No']
            }
          ]
        },
        {
          title: 'CIBIL Details',
          subtitle: 'Your credit profile',
          questions: [
            {
              id: 'cibil',
              label: 'CIBIL Score',
              type: 'select',
              options: ['750+', '700-749', 'Below 700', 'Not sure']
            },
           
            {
              id: 'bounce',
              label: 'Any Active Loan EMI bounces in last 6 months',
              type: 'select',
              options: ['None', '1-2 minor', 'Multiple']
            },
             {
              id: 'history',
              label: 'Any past loan or credit card defaults, write-offs, settlements or overdue?',
              type: 'select',
              options: [
                'No, clean history',
                'Minor past issue (resolved)',
                'Yes, unresolved issues'
              ]
            },
          ]
        },
        {
          title: 'Loan Requirement',
          subtitle: 'Funding needs',
          questions: [
            {
              id: 'amount',
              label: 'How Much Loan Amount do you require?',
              type: 'select',
              options: ['₹5-10 Lakhs', '₹10-20 Lakhs', '₹20-50 Lakhs', '₹50 Lakhs+']
            },
            {
              id: 'urgency',
              label: 'How Urgently do you need the funds?',
              type: 'select',
              options: [
                'Immediately (within 7 days)',
                'Within 15-30 days',
                'Flexible timeline'
              ]
            }
          ]
        },
        {
          title: 'Contact Details',
          subtitle: 'We will reach you',
          questions: [
            { id: 'name',  label: 'Contact Person Name', type: 'text' },
            { id: 'phone', label: 'Contact Number',      type: 'text' },
            { id: 'email', label: 'Email ID',            type: 'text' },
            { id: 'city', label: 'City', type:'text'}
          ]
        },
        
      ]
    },

    business: {
      title: 'Business Loan',
      subtitle: 'Fuel your business growth',
      groups: [
        {
          title: 'Business Details',
          subtitle: 'Tell us about your business',
          questions: [
            { id: 'businessName',  label: 'Business Name',       type: 'text' },
            // { id: 'contactPerson', label: 'Contact Person Name', type: 'text' },
            // { id: 'mobile',        label: 'Mobile Number',       type: 'text' },
            // { id: 'email',         label: 'Email ID',            type: 'text' },
            {
              id: 'businessEntity',
              label: 'Business Entity',
              type: 'select',
              options: [
                'Sole Proprietor',
                'Partnership',
                'Private Limited',
                'Limited Liability Company'
              ]
            },
            {
              id: 'businessVintage',
              label: 'Business Vintage',
              type: 'select',
              options: ['0 to 3 Years', '3 to 6 Years', '6 to 10 Years', '10+ Years']
            },
            {
              id: 'businessTurnover',
              label: 'Annual Turnover',
              type: 'select',
              options: [
                'Upto 1 Crore',
                '1 - 3 Crores',
                '3 - 5 Crores',
                '5 - 10 Crores',
                'Above 10 Crores'
              ]
            },
            {
              id: 'gst',
              label: 'GST Registered?',
              type: 'select',
              options: ['Yes', 'No']
            },
            {
              id: 'currentAccount',
              label: 'Do you currently hold a business current account?',
              type: 'select',
              options: [
                'Yes, actively used',
                'Yes, but low transactions',
                'No'
              ]
            }
          ]
        },
        // {
        //   title: 'Business Profile',
        //   subtitle: 'Your business performance',
        //   questions: [
        //     {
        //       id: 'businessVintage',
        //       label: 'Business Vintage',
        //       type: 'select',
        //       options: ['0 to 3 Years', '3 to 6 Years', '6 to 10 Years', '10+ Years']
        //     },
        //     {
        //       id: 'businessTurnover',
        //       label: 'Annual Turnover',
        //       type: 'select',
        //       options: [
        //         'Upto 1 Crore',
        //         '1 - 3 Crores',
        //         '3 - 5 Crores',
        //         '5 - 10 Crores',
        //         'Above 10 Crores'
        //       ]
        //     },
        //     {
        //       id: 'gst',
        //       label: 'GST Registered?',
        //       type: 'select',
        //       options: ['Yes', 'No']
        //     },
        //     {
        //       id: 'currentAccount',
        //       label: 'Current Account Status',
        //       type: 'select',
        //       options: [
        //         'Yes, actively used',
        //         'Yes, but low transactions',
        //         'No'
        //       ]
        //     }
        //   ]
        // },
        {
          title: 'CIBIL Details',
          subtitle: 'Credit profile check',
          questions: [
            {
              id: 'cibil',
              label: 'CIBIL Score',
              type: 'select',
              options: ['750+', '700-749', 'Below 700', 'Not sure']
            },
            {
              id: 'history',
              label: 'Any past loan or credit card defaults, write-offs, settlements or overdue?',
              type: 'select',
              options: [
                'No, clean history',
                'Minor past issue (resolved)',
                'Yes, unresolved issues'
              ]
            }
          ]
        },
        {
          title: 'Loan Requirement',
          subtitle: 'Funding needs',
          questions: [
            { id: 'loanAmount', label: 'How Much Loan Amount do you require?', type: 'text' },
            {
              id: 'loanUrgency',
              label: 'How Urgently do you need the funds?',
              type: 'select',
              options: [
                'Immediately (within 7 days)',
                'Within 15–30 days',
                'Flexible timeline'
              ]
            }
          ]
        },
         {
          title: 'Contact Details',
          subtitle: 'We will reach you',
          questions: [
             { id: 'contactPerson', label: 'Contact Person Name', type: 'text' },
            { id: 'mobile',        label: 'Mobile Number',       type: 'text' },
            { id: 'email',         label: 'Email ID',            type: 'text' },
            { id:'city', label:'City', type:'text'}
          ]
        }, 
      ]
    },

    professional: {
      title: 'Professional Loan',
      subtitle: 'Loans for Doctors, CAs, Architects & Professionals',
      groups: [
        {
          title: 'Professional Details',
          subtitle: "What's your profession?",
          questions: [
            {
              id: 'profession',
              label: 'Profession',
              type: 'select',
              options: ['Doctor', 'Architect', 'Chartered Accountant']
            },
            {
              id: 'experience',
              label: 'How many years of work experience do you have?',
              type: 'text',
              ph: 'Enter years (0-50)'
            },
            { id: 'monthlyIncome', label: 'Monthly Income (₹)', type: 'text' }
          ]
        },
        // {
        //   title: 'CIBIL Details',
        //   subtitle: 'Your credit profile',
        //   questions: [
        //     {
        //       id: 'cibil',
        //       label: 'CIBIL Score',
        //       type: 'select',
        //       options: ['750+', '700–749', '650–699', 'Below 650', 'Not sure']
        //     },
        //     {
        //       id: 'creditHistory',
        //       label: 'Credit History',
        //       type: 'select',
        //       options: [
        //         'No, clean history',
        //         'Minor past issue (resolved)',
        //         'Yes, unresolved issues'
        //       ]
        //     }
        //   ]
        // },
        {
          title: 'Loan Requirement',
          subtitle: 'Funding needs',
          questions: [
            { id: 'loanAmount', label: 'How Much Loan Amount do you require?', type: 'text' },
            {
              id: 'loanUrgency',
              label: 'How Urgently do you need the funds?',
              type: 'select',
              options: [
                'Immediately (within 7 days)',
                'Within 15–30 days',
                'Flexible timeline'
              ]
            }
          ]
        },
        {
          title: 'Contact Details',
          subtitle: 'We will reach you',
          questions: [
            { id: 'name',   label: 'Full Name',     type: 'text' },
            { id: 'mobile', label: 'Mobile Number', type: 'text' },
            { id: 'email',  label: 'Email ID',      type: 'text' },
            { id:'city', label:'City', type:'text'}
          ]
        },
        
      ]
    }
  };

  constructor(private apiService: ApiserviceService,private route: ActivatedRoute,private router: Router) {}

  // ─── Lifecycle ─────────────────────────────────────────────
  ngOnInit(): void {
    this.answers = {};
    this.route.queryParams.subscribe(params => {
    const source = params['source'];

    this.enquirySource =
      source === 'facebook' ? 'Facebook' : 'Website';
  });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    clearInterval(this.mobileTimer);
  }

  // ─── Getters ───────────────────────────────────────────────
  get config(): LoanConfig | null {
    return this.selectedLoan ? this.loanConfigs[this.selectedLoan] : null;
  }

  get currentGroup(): Group | null {
    return this.config?.groups[this.currentGroupIndex] ?? null;
  }

  get totalGroups(): number {
    return this.config?.groups.length ?? 0;
  }

  get progressPercent(): number {
    return Math.round((this.currentGroupIndex / this.totalGroups) * 100);
  }

  // ─── Mobile field id differs per loan type ─────────────────
  get mobileFieldId(): string {
    return this.selectedLoan === 'personal' ? 'phone' : 'mobile';
  }

  // ─── Check if current group contains the mobile field ──────
  get currentGroupHasMobile(): boolean {
    return !!this.currentGroup?.questions.find(
      q => q.id === this.mobileFieldId
    );
  }

  // ─── Loan Selection ────────────────────────────────────────
  selectLoan(type: string): void {
    this.selectedLoan      = type;
    this.currentGroupIndex = 0;
    this.answers           = {};
    this.fieldErrors       = {};

    this.resetOtpState();

    // force null for all select fields so placeholder shows
    this.config?.groups.forEach(group => {
      group.questions.forEach(q => {
        if (q.type === 'select') {
          this.answers[q.id] = null;
        }
      });
    });

    this.showErrors = false;
  }

  // ─── OTP: Reset ────────────────────────────────────────────
  private resetOtpState(): void {
    this.mobileOtpSent       = false;
    this.mobileOtpVerified   = false;
    this.sendingMobileOtp    = false;
    this.verifyingMobileOtp  = false;
    this.mobileResendCooldown = 0;
    this.mobileOtp           = '';
    clearInterval(this.mobileTimer);
  }

  // ─── OTP: Cooldown Timer ───────────────────────────────────
  private startMobileCooldown(): void {
    this.mobileResendCooldown = 30;
    clearInterval(this.mobileTimer);
    this.mobileTimer = setInterval(() => {
      this.mobileResendCooldown--;
      if (this.mobileResendCooldown <= 0) {
        clearInterval(this.mobileTimer);
      }
    }, 1000);
  }

  // ─── OTP: Send ─────────────────────────────────────────────
  sendMobileOtp(): void {
    const mobile = this.answers[this.mobileFieldId];

    if (!mobile || !/^[6-9][0-9]{9}$/.test(mobile)) {
      alert('Please enter a valid 10-digit mobile number first.');
      return;
    }

    if (this.mobileResendCooldown > 0) return;

    this.sendingMobileOtp = true;

    this.apiService.sendOtp({ mobile })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.sendingMobileOtp = false))
      )
      .subscribe({
        next: (res: any) => {
          if (res?.message && !res?.error) {
            this.mobileOtpSent     = true;
            this.mobileOtpVerified = false;
            this.mobileOtp         = '';
            this.startMobileCooldown();
          } else {
            alert(res?.error || 'Could not send OTP. Please try again.');
          }
        },
        error: (err: HttpErrorResponse) => {
          alert(
            err?.error?.error ||
            err?.error?.message ||
            'Failed to send OTP.'
          );
        }
      });
  }

  // ─── OTP: Verify ───────────────────────────────────────────
  verifyMobileOtp(): void {
    const mobile = this.answers[this.mobileFieldId];

    if (!this.mobileOtp || this.mobileOtp.length !== 4) {
      alert('Please enter the 4-digit OTP.');
      return;
    }

    this.verifyingMobileOtp = true;

    this.apiService.verifyOtp({ mobile, otp: this.mobileOtp })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.verifyingMobileOtp = false))
      )
      .subscribe({
        next: (res: any) => {
          if (res?.message && !res?.error) {
            this.mobileOtpVerified = true;
          } else {
            alert(res?.error || 'Incorrect OTP. Please try again.');
          }
        },
        error: (err: HttpErrorResponse) => {
          alert(
            err?.error?.error ||
            err?.error?.message ||
            'OTP verification failed.'
          );
        }
      });
  }

  // ─── Navigation ────────────────────────────────────────────
  goBack(): void {
    if (this.currentGroupIndex > 0) {
      this.currentGroupIndex--;
      this.showErrors = false;
      this.fieldErrors = {};  
    } else {
      this.selectedLoan = null;
    }
  }

  nextGroup(): void {

    // Eligibility checks (keep as is)
    if (this.answers['cibil'] === 'Below 700') {
      this.openEligibilityPopup('You are not eligible based on your CIBIL Score.');
      return;
    }
    if (this.answers['history'] === 'Yes, unresolved issues') {
      this.openEligibilityPopup('You are not eligible due to unresolved credit history.');
      return;
    }
    if (this.answers['bounce'] === 'Multiple') {
      this.openEligibilityPopup('You are not eligible due to multiple EMI bounces.');
      return;
    }
    if (this.answers['gst'] === 'No') {
      this.openEligibilityPopup('We are unable to proceed because GST registration is required to verify your business operations.');
      return;
    }
    if (this.answers['payslip'] === 'No') {
      this.openEligibilityPopup('You are not eligible for a personal loan because payslips are required as proof of stable income.');
      return;
    }
     if (this.answers['salaryBank'] === 'No') {
      this.openEligibilityPopup('You are not eligible for a personal loan because a salary account is required.');
      return;
    }
    if (this.selectedLoan === 'personal' && this.answers['salary']) {
    const salary = Number(this.answers['salary']);

    if (salary < 30000) {
      this.openEligibilityPopup('You are not eligible. Your salary must be at least ₹30,000.');
      return;
    }
  }


    // Block if mobile not OTP verified
    if (this.currentGroupHasMobile && !this.mobileOtpVerified) {
      this.openEligibilityPopup('Please verify your mobile number with OTP to continue.');
      return;
    }

    // Field validation with specific rules
    const questions = this.currentGroup!.questions.filter(
      q => !(q.id === 'emiAmount' && this.answers['hasEmi'] !== 'Yes')
    );

    for (const q of questions) {
      const value = this.answers[q.id];


      if (!value && value !== 0) {
        this.showErrors = true;
        this.fieldErrors[q.id] = 'This field is required.';
        continue;
      }

      // Mobile validation
      if (q.id === 'phone' || q.id === 'mobile') {
        if (!/^[6-9][0-9]{9}$/.test(value)) {
          this.showErrors = true;
          this.fieldErrors[q.id] = 'Enter a valid 10-digit Indian mobile number.';
          continue;
        }
      }

      // Email validation
      if (q.id === 'email') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          this.showErrors = true;
          this.fieldErrors[q.id] = 'Please enter a valid email address.';
          continue;
        }
      }

      // Salary / income / EMI — must be a positive number
      if (['salary', 'monthlyIncome', 'emiAmount', 'loanAmount'].includes(q.id)) {
        if (isNaN(value) || Number(value) <= 0) {
          this.showErrors = true;
          this.fieldErrors[q.id] = 'Please enter a valid amount greater than 0.';
          continue;
        }
      }

      // Experience — must be 0-50
      if (q.id === 'experience') {
        if (isNaN(value) || Number(value) < 0 || Number(value) > 50) {
          this.showErrors = true;
          this.fieldErrors[q.id] = 'Please enter valid years between 0 and 50.';
          continue;
        }
      }

      // Name fields — min 2 characters
      if (['name', 'contactPerson', 'company', 'businessName'].includes(q.id)) {
        if (value.trim().length < 2) {
          this.showErrors = true;
          this.fieldErrors[q.id] = 'Minimum 2 characters required.';
          continue;
        }
      }

      // Clear error if valid
      this.fieldErrors[q.id] = '';
    }

    // Stop if any errors exist
    if (Object.values(this.fieldErrors).some(e => !!e)) {
      return;
    }

    this.showErrors = false;
    this.fieldErrors = {};

    if (this.currentGroupIndex < this.totalGroups - 1) {
      this.currentGroupIndex++;
    } else {
      this.submitForm();
    }
  }

  submitForm(): void {
    this.isSubmitting = true;

    const a = this.answers;

    const payload: any = {
      accountId:     1234567,
      productType:   this.getProductType(),
      status:        'active',
      enquirySource: this.enquirySource,
    };

    if (this.selectedLoan === 'personal') {
      payload.companyName          = a['company']    || null;
      payload.workExperience       = a['duration']   || null;
      payload.monthlyIncome        = a['salary']     || null;
      payload.totalEmi             = a['emiAmount']  || null;
      payload.payslipProvided      = a['payslip']    || null;
      payload.salaryCreditedToBank = a['salaryBank'] || null;
      payload.cibilScore           = a['cibil']      || null;
      payload.creditHistory        = a['history']    || null;
      payload.emiBounces           = a['bounce']     || null;
      payload.contactPerson        = a['name']       || null;
      payload.mobile               = a['phone']      || null;
      payload.emailId              = a['email']      || null;
      payload.loanRequirement      = a['amount']     || null;
      payload.loanUrgency          = a['urgency']    || null;
      payload.city                 =a['city']        || null;
    }

    else if (this.selectedLoan === 'business') {
      payload.businessName           = a['businessName']     || null;
      payload.contactPerson          = a['contactPerson']    || null;
      payload.mobile                 = a['mobile']           || null;
      payload.emailId                = a['email']            || null;
      payload.businessEntity         = a['businessEntity']   || null;
      payload.businessVintage        = a['businessVintage']  || null;
      payload.businessTurnover       = a['businessTurnover'] || null;
      payload.isGstRegistered        = a['gst']              || null;
      payload.businessCurrentAccount = a['currentAccount']   || null;
      payload.cibilScore             = a['cibil']            || null;
      payload.creditHistory          = a['history']    || null;
      payload.loanRequirement        = a['loanAmount']       || null;
      payload.loanUrgency            = a['loanUrgency']      || null;
      payload.city                   = a['city']             || null;
    }

    else if (this.selectedLoan === 'professional') {
      payload.profession      = a['profession']    || null;
      payload.workExperience  = a['experience']    || null;
      payload.monthlyIncome   = a['monthlyIncome'] || null;
      payload.contactPerson   = a['name']          || null;
      payload.mobile          = a['mobile']        || null;
      payload.emailId         = a['email']         || null;
      payload.loanRequirement = a['loanAmount']    || null;
      payload.loanUrgency     = a['loanUrgency']   || null;
      payload.city            = a['city']          || null;
    }

    this.apiService.createEnquiry(payload).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        if (res?.message) {
          this.referenceId = res?.enquiryId || '';
          this.isSubmitted = true;

          // Facebook Pixel tracking
          if (
            this.enquirySource?.toLowerCase() === 'facebook' &&
            typeof (window as any).fbq === 'function'
          ) {
            (window as any).fbq('track', 'Lead');
          }

        }
      },
      error: (err: any) => {
        this.isSubmitting = false;
        alert(err?.error?.message || 'Submission failed. Please try again.');
      }
    });
  }

  private getProductType(): string {
    const map: Record<string, string> = {
      personal:     'personalLoan',
      business:     'businessLoan',
      professional: 'professionalLoans',
    };
    return map[this.selectedLoan!] || 'businessLoan';
  }

  resetApp(): void {
    this.selectedLoan      = null;
    this.currentGroupIndex = 0;
    this.answers           = {};
    this.isSubmitted       = false;
    this.isSubmitting      = false;
    this.showErrors        = false;
    this.referenceId       = '';
    this.resetOtpState();
  }

  private openEligibilityPopup(message: string): void {
    this.eligibilityMessage = message;
    this.showEligibilityPopup = true;
  }
  goToHome(): void {
    this.router.navigate(['/']);
  }

  get isMobileValid(): boolean {
    const mobile = this.answers[this.mobileFieldId];
    return !!(mobile && /^[6-9][0-9]{9}$/.test(String(mobile)));
  }

}