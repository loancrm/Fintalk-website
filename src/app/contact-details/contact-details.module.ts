import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactDetailsComponent } from './contact-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { SelectModule } from 'primeng/select';



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
    SelectModule 
  ],
  exports:[
    ContactDetailsComponent
  ]
})
export class ContactDetailsModule { }
