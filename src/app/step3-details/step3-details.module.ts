import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Step3DetailsComponent } from './step3-details.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';



@NgModule({
  declarations: [
    Step3DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule
  ],
  exports:[
    Step3DetailsComponent
  ]
})
export class Step3DetailsModule { }
