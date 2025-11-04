import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent {
  form!: FormGroup;

  turnoverOptions = [
    { label: 'Below 60 Lakhs', value: 'Below 60 Lakhs' },
    { label: 'Below 1 Crore', value: 'Below 1 Crore' },
    { label: 'Below 3 Crores', value: 'Below 3 Crores' },
    { label: '4-6 Crores', value: '4-6 Crores' },
    { label: '7-10 Crores', value: '7-10 Crores' },
    { label: '11-15 Crores', value: '11-15 Crores' },
    { label: '16-20 Crores', value: '16-20 Crores' },
    { label: 'Above 20 Crores', value: 'Above 20 Crores' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[789][0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      turnover: [null, Validators.required],
      gst: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}$'),
        ],
      ],
      consent: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // Make API call or handle the data
    }
  }
}
