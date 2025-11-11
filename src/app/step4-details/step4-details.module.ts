import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Step4DetailsComponent } from './step4-details.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';



@NgModule({
  declarations: [
    Step4DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule
  ],
  exports:[
    Step4DetailsComponent
  ]
})
export class Step4DetailsModule { }
