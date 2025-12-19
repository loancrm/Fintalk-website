import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

interface Message {
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: string[];
  field?: string;
}

interface ConversationStep {
  question: string;
  field?: string | null;
  options?: string[];
  validation?: (value: string) => boolean;
  condition?: () => boolean;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;
  
  isOpen = false;
  messages: Message[] = [];
  currentStep = 0;
  formData: any = {
    productType: undefined,
    accountId: 1234567
  };
  loading = false;
  conversationHistory: Array<{step: number, field: string, value: any}> = [];
  showBackButton = false;

  loanTypes = [
    'Business Loan',
    'Professional Loan',
    'Personal Loan',
    'Education Loan'
  ];

  businessEntities = [
    'Sole Proprietor',
    'Partnership',
    'Private Limited',
    'Limited Liability Company'
  ];

  professions = [
    'doctor',
    'architect',
    'chartered_accountant'
  ];

  educationTypes = [
    'abroad_education',
    'indian_education'
  ];

  courseLevels = [
    'ug',
    'pg',
    'diploma',
    'phd'
  ];

  businessVintages = [
    '0 to 3 Years',
    '3 to 6 Years',
    '6 to 10 Years',
    '10+ Years'
  ];

  businessTurnovers = [
    'Less than 1 Crore',
    '1 to 3 Crores',
    '3 to 5 Crores',
    '5 to 10 Crores',
    'More than 10 Crores'
  ];

  incomeRanges = [
    'Below 15000',
    '15000_25000',
    '25000_40000',
    '40000_60000',
    '60000_100000',
    'Above_100000'
  ];

  workExperiences = [
    '0_1_year',
    '1_2_years',
    '2_5_years',
    '5_10_years',
    '10_plus_years'
  ];

  constructor(
    private router: Router,
    private apiService: ApiserviceService
  ) {}

  ngOnInit() {
    // Don't auto-start conversation
  }

  ngAfterViewChecked() {
    // Don't auto-scroll here - let users scroll freely
  }

  scrollToBottom(force: boolean = false): void {
    try {
      if (this.chatContainer) {
        const container = this.chatContainer.nativeElement;
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
        
        // Only auto-scroll if user is already near bottom or if forced
        if (force || isNearBottom) {
          setTimeout(() => {
            container.scrollTop = container.scrollHeight;
          }, 50);
        }
      }
    } catch(err) { }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.startConversation();
    }
    this.updateBackButtonVisibility();
  }

  startConversation() {
    this.addBotMessage("👋 Welcome! I'm here to help you apply for a loan. Let's start your incredible journey!", ["Let's Begin!"]);
  }

  getConversationFlow(): ConversationStep[] {
    const flow: ConversationStep[] = [
      {
        question: "Great! What type of loan are you looking for?",
        field: 'productType',
        options: this.loanTypes
      }
    ];

    // Add loan-type-specific questions
    if (this.formData.productType === 'Business Loan') {
      flow.push(
        {
          question: "What's your business entity type?",
          field: 'businessEntity',
          options: this.businessEntities
        },
        {
          question: "How long has your business been operating?",
          field: 'businessVintage',
          options: this.businessVintages
        },
        {
          question: "What's your annual business turnover?",
          field: 'businessTurnover',
          options: this.businessTurnovers
        }
      );
    } else if (this.formData.productType === 'Professional Loan') {
      flow.push(
        {
          question: "What's your profession?",
          field: 'profession',
          options: ['Doctor', 'Architect', 'Chartered Accountant']
        },
        {
          question: "What's your monthly income?",
          field: 'monthlyIncome',
          options: ['Below ₹15,000', '₹15,000 - ₹25,000', '₹25,000 - ₹40,000', '₹40,000 - ₹60,000', '₹60,000 - ₹1,00,000', 'Above ₹1,00,000']
        },
        {
          question: "How many years of work experience do you have?",
          field: 'workExperience',
          options: ['0 - 1 Year', '1 - 2 Years', '2 - 5 Years', '5 - 10 Years', '10+ Years']
        }
      );
    } else if (this.formData.productType === 'Personal Loan') {
      flow.push(
        {
          question: "What's your monthly income?",
          field: 'monthlyIncome',
          options: ['Below ₹15,000', '₹15,000 - ₹25,000', '₹25,000 - ₹40,000', '₹40,000 - ₹60,000', '₹60,000 - ₹1,00,000', 'Above ₹1,00,000']
        },
        {
          question: "How many years of work experience do you have?",
          field: 'workExperience',
          options: ['0 - 1 Year', '1 - 2 Years', '2 - 5 Years', '5 - 10 Years', '10+ Years']
        },
        {
          question: "What's your company name? (Optional - type 'skip' to continue)",
          field: 'companyName',
          validation: () => true // Optional field
        }
      );
    } else if (this.formData.productType === 'Education Loan') {
      flow.push(
        {
          question: "Where do you want to study?",
          field: 'educationType',
          options: ['Abroad Education', 'Indian Education']
        },
        {
          question: "What's the course level?",
          field: 'courseLevel',
          options: ['Undergraduate (UG)', 'Postgraduate (PG)', 'Diploma / Certification', 'PhD / Research']
        },
        {
          question: "What's your monthly income? (or family income)",
          field: 'monthlyIncome',
          options: ['Below ₹15,000', '₹15,000 - ₹25,000', '₹25,000 - ₹40,000', '₹40,000 - ₹60,000', '₹60,000 - ₹1,00,000', 'Above ₹1,00,000']
        }
      );
    }

    // Add contact details (common for all)
    flow.push(
      {
        question: "What's your full name?",
        field: 'contactPerson',
        validation: (value: string) => value.trim().length >= 3
      },
      {
        question: "What's your mobile number? (10 digits)",
        field: 'mobile',
        validation: (value: string) => /^\d{10}$/.test(value)
      },
      {
        question: "What's your email address?",
        field: 'emailId',
        validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      }
    );

    // Business name for Business Loan
    if (this.formData.productType === 'Business Loan') {
      flow.push({
        question: "What's your business name?",
        field: 'businessName',
        validation: (value: string) => value.trim().length > 0
      });
    }

    flow.push(
      {
        question: "What's your loan requirement amount? (Optional - enter a number or skip)",
        field: 'loanRequirement',
        validation: (value: string) => {
          if (!value || value.trim() === '') return true; // Optional
          return /^[0-9]+$/.test(value);
        }
      }
    );

    // GST registration only for Business Loan
    if (this.formData.productType === 'Business Loan') {
      flow.push({
        question: "Are you GST registered?",
        field: 'isGstRegistered',
        options: ['Yes', 'No']
      });
    }

    flow.push({
      question: "🎉 Perfect! I've collected all your information. Ready to submit your application?",
      field: null,
      options: ['Submit Application', 'Review Information']
    });

    return flow;
  }

  addBotMessage(content: string, options?: string[]) {
    this.messages.push({
      type: 'bot',
      content,
      timestamp: new Date(),
      options
    });
    // Auto-scroll when new bot message is added
    setTimeout(() => {
      this.scrollToBottom(true);
    }, 100);
  }

  addUserMessage(content: string) {
    this.messages.push({
      type: 'user',
      content,
      timestamp: new Date()
    });
    // Auto-scroll when new user message is added
    setTimeout(() => {
      this.scrollToBottom(true);
    }, 100);
  }

  handleOptionClick(option: string) {
    if (this.currentStep === 0 && option === "Let's Begin!") {
      this.addUserMessage(option);
      this.currentStep = 1;
      setTimeout(() => {
        this.askNextQuestion();
      }, 500);
      return;
    }

    const flow = this.getConversationFlow();
    const flowIndex = this.currentStep - 1; // Map step to flow index (step 1 = flow[0])
    
    if (flowIndex >= flow.length || flowIndex < 0) {
      this.handleFinalStep(option);
      return;
    }

    const currentFlow = flow[flowIndex];
    
    if (!currentFlow) {
      console.error('No current flow at step:', this.currentStep, 'flowIndex:', flowIndex);
      return;
    }
    
    if (currentFlow.field === 'isGstRegistered') {
      this.addUserMessage(option);
      this.formData['isGstRegistered'] = option;
      this.currentStep++;
      setTimeout(() => {
        this.askNextQuestion();
      }, 500);
      return;
    }

    // Handle option-based fields (like loan type, business entity, etc.)
    if (currentFlow.options && currentFlow.options.includes(option)) {
      this.addUserMessage(option);
      if (currentFlow.field) {
        // Map display values to backend values
        let valueToSave = option;
        if (currentFlow.field === 'profession') {
          const professionMap: any = {
            'Doctor': 'doctor',
            'Architect': 'architect',
            'Chartered Accountant': 'chartered_accountant'
          };
          valueToSave = professionMap[option] || option;
        } else if (currentFlow.field === 'monthlyIncome') {
          const incomeMap: any = {
            'Below ₹15,000': 'Below 15000',
            '₹15,000 - ₹25,000': '15000_25000',
            '₹25,000 - ₹40,000': '25000_40000',
            '₹40,000 - ₹60,000': '40000_60000',
            '₹60,000 - ₹1,00,000': '60000_100000',
            'Above ₹1,00,000': 'Above_100000'
          };
          valueToSave = incomeMap[option] || option;
        } else if (currentFlow.field === 'workExperience') {
          const expMap: any = {
            '0 - 1 Year': '0_1_year',
            '1 - 2 Years': '1_2_years',
            '2 - 5 Years': '2_5_years',
            '5 - 10 Years': '5_10_years',
            '10+ Years': '10_plus_years'
          };
          valueToSave = expMap[option] || option;
        } else if (currentFlow.field === 'educationType') {
          const eduMap: any = {
            'Abroad Education': 'abroad_education',
            'Indian Education': 'indian_education'
          };
          valueToSave = eduMap[option] || option;
        } else if (currentFlow.field === 'courseLevel') {
          const courseMap: any = {
            'Undergraduate (UG)': 'ug',
            'Postgraduate (PG)': 'pg',
            'Diploma / Certification': 'diploma',
            'PhD / Research': 'phd'
          };
          valueToSave = courseMap[option] || option;
        }
        this.formData[currentFlow.field] = valueToSave;
        // Track in conversation history
        this.conversationHistory.push({
          step: this.currentStep,
          field: currentFlow.field,
          value: valueToSave
        });
        console.log('Saved field:', currentFlow.field, '=', valueToSave, '(displayed as:', option, ')');
        console.log('Current formData:', this.formData);
      }
      this.currentStep++;
      this.updateBackButtonVisibility();
      setTimeout(() => {
        this.askNextQuestion();
      }, 500);
      return;
    }

    // If option doesn't match, treat as text input
    this.handleUserInput(option);
  }

  handleUserInput(input: string) {
    const flow = this.getConversationFlow();
    const flowIndex = this.currentStep - 1; // Map step to flow index (step 1 = flow[0])
    
    if (flowIndex >= flow.length || flowIndex < 0) {
      console.log('Step out of bounds:', this.currentStep, 'flowIndex:', flowIndex, 'Flow length:', flow.length);
      this.handleFinalStep('Submit Application');
      return;
    }

    const currentFlow = flow[flowIndex];
    
    if (!currentFlow) {
      console.error('No current flow at step:', this.currentStep, 'flowIndex:', flowIndex);
      return;
    }
    
    if (!currentFlow.field) {
      console.log('No field for current step:', this.currentStep);
      return;
    }

    this.addUserMessage(input);

    // Handle optional fields that can be skipped
    if ((input.toLowerCase() === 'skip' || input.trim() === '') && 
        (currentFlow.field === 'loanRequirement' || currentFlow.field === 'companyName')) {
      this.formData[currentFlow.field] = '';
      console.log('Skipped optional field:', currentFlow.field);
      this.currentStep++;
      setTimeout(() => {
        this.askNextQuestion();
      }, 500);
      return;
    }

    if (currentFlow.validation && !currentFlow.validation(input)) {
      this.addBotMessage(`❌ Invalid input. Please try again.\n${currentFlow.question}`, currentFlow.options);
      return;
    }

    this.formData[currentFlow.field] = input;
    // Track in conversation history
    this.conversationHistory.push({
      step: this.currentStep,
      field: currentFlow.field,
      value: input
    });
    console.log('Saved field:', currentFlow.field, '=', input);
    console.log('Current formData:', JSON.stringify(this.formData, null, 2));
    
    this.currentStep++;
    this.updateBackButtonVisibility();

    const nextFlowIndex = this.currentStep - 1;
    if (nextFlowIndex < flow.length) {
      setTimeout(() => {
        this.askNextQuestion();
      }, 500);
    } else {
      console.log('Reached end of flow, should show final step');
      this.handleFinalStep('Submit Application');
    }
  }

  askNextQuestion() {
    const flow = this.getConversationFlow();
    const flowIndex = this.currentStep - 1; // Map step to flow index (step 1 = flow[0])
    
    console.log('Asking next question. Current step:', this.currentStep, 'flowIndex:', flowIndex, 'Flow length:', flow.length);
    console.log('Current formData:', this.formData);
    
    this.updateBackButtonVisibility();
    
    if (flowIndex >= flow.length || flowIndex < 0) {
      this.handleFinalStep('Submit Application');
      return;
    }

    const nextFlow = flow[flowIndex];
    
    if (!nextFlow) {
      console.error('No next flow at step:', this.currentStep, 'flowIndex:', flowIndex);
      return;
    }
    
    this.addBotMessage(nextFlow.question, nextFlow.options);
    
    // Focus input if it's a text input field
    setTimeout(() => {
      if (this.canShowInput() && this.messageInput) {
        this.messageInput.nativeElement.focus();
      }
    }, 100);
  }

  handleFinalStep(option: string) {
    this.addUserMessage(option);

    if (option === 'Submit Application' || option === 'Try Again') {
      this.submitApplication();
    } else if (option === 'Restart Chat') {
      this.startOver();
    } else if (option === 'Connect via WhatsApp' || option === 'Yes, connect via WhatsApp') {
      this.openWhatsApp();
    } else if (option === 'Review Information') {
      this.showReview();
    } else if (option === 'Start Over') {
      this.startOver();
    } else if (option === 'No, thank you') {
      this.addBotMessage("Thank you for your time! Feel free to reach out anytime if you need assistance. 😊");
      this.addBotMessage("Would you like to start a new application?", ['Restart Chat']);
    }
  }

  startOver() {
    this.restartChat();
  }

  restartChat() {
    this.formData = { accountId: 1234567 };
    this.currentStep = 0;
    this.messages = [];
    this.conversationHistory = [];
    this.showBackButton = false;
    setTimeout(() => {
      this.startConversation();
    }, 500);
  }

  goBackOneStep() {
    if (this.currentStep <= 1) return; // Can't go back from first question
    
    // Remove the last user and bot messages (remove bot question and user answer)
    let removedCount = 0;
    while (this.messages.length > 0 && removedCount < 2) {
      const lastMessage = this.messages[this.messages.length - 1];
      if (lastMessage.type === 'user' || lastMessage.type === 'bot') {
        this.messages.pop();
        removedCount++;
      } else {
        break;
      }
    }
    
    // Remove the last conversation history entry and clear form data
    if (this.conversationHistory.length > 0) {
      const lastEntry = this.conversationHistory.pop();
      if (lastEntry && lastEntry.field) {
        // Clear the form data for that field
        delete this.formData[lastEntry.field];
        
        // If going back from productType, clear all dependent fields
        if (lastEntry.field === 'productType') {
          // Clear all loan-type-specific fields
          delete this.formData.businessEntity;
          delete this.formData.businessVintage;
          delete this.formData.businessTurnover;
          delete this.formData.businessName;
          delete this.formData.profession;
          delete this.formData.educationType;
          delete this.formData.courseLevel;
          // Keep monthlyIncome, workExperience, companyName as they might be used by multiple types
        }
      }
    }
    
    // Go back one step
    this.currentStep--;
    
    // Update back button visibility
    this.updateBackButtonVisibility();
    
    // Re-ask the previous question
    setTimeout(() => {
      this.askNextQuestion();
    }, 300);
  }

  updateBackButtonVisibility() {
    this.showBackButton = this.currentStep > 1 && this.messages.length > 1;
  }

  submitApplication() {
    this.addBotMessage("📝 Submitting your application...");
    this.loading = true;

    // Prepare data similar to contact-details component
    const formData = {
      ...this.formData,
      eligibility: 'eligible'
    };

    // Clean up optional fields
    if (!formData.loanRequirement || formData.loanRequirement === '') {
      formData.loanRequirement = '';
    }
    if (!formData.companyName || formData.companyName === '') {
      delete formData.companyName;
    }

    // Ensure required fields are present
    if (!formData.contactPerson || !formData.mobile || !formData.emailId) {
      this.loading = false;
      this.addBotMessage("❌ Missing required information. Please complete all fields.");
      return;
    }

    console.log('Submitting loan application:', formData);
    console.log('Full formData object:', JSON.stringify(formData, null, 2));

    this.apiService.createEnquiry(formData).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.addBotMessage("✅ Your application has been submitted successfully! Our team will contact you shortly.");
        this.addBotMessage("Thank you for using our chatbot! Would you like to start a new application?", ['Restart Chat', 'No, thank you']);
      },
      error: (error: any) => {
        this.loading = false;
        console.error('Error submitting application:', error);
        const errorMessage = error?.error?.message || '❌ Failed to submit application. Please try again.';
        this.addBotMessage(errorMessage);
        this.addBotMessage("Would you like to try again?", ['Try Again', 'Restart Chat']);
      }
    });
  }

  showReview() {
    let review = "📋 Here's your information:\n\n";
    review += `Loan Type: ${this.formData.productType || 'Not provided'}\n`;
    
    if (this.formData.businessEntity) review += `Business Entity: ${this.formData.businessEntity}\n`;
    if (this.formData.businessVintage) review += `Business Vintage: ${this.formData.businessVintage}\n`;
    if (this.formData.businessTurnover) review += `Business Turnover: ${this.formData.businessTurnover}\n`;
    if (this.formData.profession) review += `Profession: ${this.formData.profession}\n`;
    if (this.formData.monthlyIncome) review += `Monthly Income: ${this.formData.monthlyIncome}\n`;
    if (this.formData.workExperience) review += `Work Experience: ${this.formData.workExperience}\n`;
    if (this.formData.educationType) review += `Education Type: ${this.formData.educationType}\n`;
    if (this.formData.courseLevel) review += `Course Level: ${this.formData.courseLevel}\n`;
    if (this.formData.companyName) review += `Company Name: ${this.formData.companyName}\n`;
    
    review += `\nContact Details:\n`;
    review += `Name: ${this.formData.contactPerson || 'Not provided'}\n`;
    review += `Mobile: ${this.formData.mobile || 'Not provided'}\n`;
    review += `Email: ${this.formData.emailId || 'Not provided'}\n`;
    if (this.formData.businessName) review += `Business Name: ${this.formData.businessName}\n`;
    if (this.formData.loanRequirement) review += `Loan Requirement: ${this.formData.loanRequirement}\n`;
    review += `GST Registered: ${this.formData.isGstRegistered || 'Not provided'}\n\n`;
    review += "Would you like to submit or make changes?";
    
    this.addBotMessage(review, ['Submit Application', 'Restart Chat']);
  }

  openWhatsApp() {
    const phoneNumber = "919985961300";
    const message = this.buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    this.addBotMessage("📱 Opening WhatsApp... You can also click the WhatsApp button below anytime!");
  }

  buildWhatsAppMessage(): string {
    let message = "Hello! I'm interested in applying for a loan.\n\n";
    message += `Loan Type: ${this.formData.productType || 'Not provided'}\n`;
    
    if (this.formData.businessEntity) message += `Business Entity: ${this.formData.businessEntity}\n`;
    if (this.formData.businessVintage) message += `Business Vintage: ${this.formData.businessVintage}\n`;
    if (this.formData.businessTurnover) message += `Business Turnover: ${this.formData.businessTurnover}\n`;
    if (this.formData.profession) message += `Profession: ${this.formData.profession}\n`;
    if (this.formData.monthlyIncome) message += `Monthly Income: ${this.formData.monthlyIncome}\n`;
    if (this.formData.workExperience) message += `Work Experience: ${this.formData.workExperience}\n`;
    
    message += `\nContact:\n`;
    message += `Name: ${this.formData.contactPerson || 'Not provided'}\n`;
    message += `Mobile: ${this.formData.mobile || 'Not provided'}\n`;
    message += `Email: ${this.formData.emailId || 'Not provided'}\n\n`;
    message += "Please assist me with the loan application process.";
    return message;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      
      const inputElement = event.target as HTMLInputElement;
      if (inputElement && inputElement.value) {
        const input = inputElement.value.trim();
        if (input) {
          this.handleUserInput(input);
          inputElement.value = '';
        }
      }
    }
  }

  handleInputSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    // Get input element - could be from form submit or input keydown
    let inputElement: HTMLInputElement | null = null;
    
    if (event.target instanceof HTMLInputElement) {
      // Event came from input keydown
      inputElement = event.target;
    } else if (event.target instanceof HTMLFormElement) {
      // Event came from form submit
      inputElement = event.target.querySelector('input[type="text"]') as HTMLInputElement;
    } else {
      // Try to find input in the form
      const form = (event.target as HTMLElement).closest('form');
      if (form) {
        inputElement = form.querySelector('input[type="text"]') as HTMLInputElement;
      }
    }
    
    if (inputElement && inputElement.value) {
      const input = inputElement.value.trim();
      if (input) {
        this.handleUserInput(input);
        inputElement.value = '';
      }
    }
  }

  canShowInput(): boolean {
    const flow = this.getConversationFlow();
    const flowIndex = this.currentStep - 1; // Map step to flow index (step 1 = flow[0])
    if (flowIndex >= flow.length || flowIndex < 0) return false;
    const currentFlow = flow[flowIndex];
    return !currentFlow.options && currentFlow.field !== null;
  }

  formatMessage(content: string): string {
    return content.replace(/\n/g, '<br>');
  }
}
