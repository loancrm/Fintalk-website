import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Step2DetailsComponent } from './step2-details.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    Step2DetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    BreadcrumbModule
  ],
  exports:[
    Step2DetailsComponent
  ]
})
export class Step2DetailsModule { }
