import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookiesPolicyComponent } from './cookies-policy.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CookiesPolicyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CookiesPolicyComponent }
    ])
  ]
})
export class CookiesPolicyModule { }
