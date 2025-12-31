import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Step3DetailsComponent } from './step3-details.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    Step3DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BreadcrumbModule,
    InputTextModule,
  ],
  exports:[
    Step3DetailsComponent
  ]
})
export class Step3DetailsModule { }
