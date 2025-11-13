import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactDetailsComponent } from './contact-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    ContactDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BreadcrumbModule,
    DropdownModule
  ],
  exports:[
    ContactDetailsComponent
  ]
})
export class ContactDetailsModule { }
