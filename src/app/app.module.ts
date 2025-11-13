import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonModule } from "primeng/button";
// import { AccordionModule } from "primeng/accordion";
import { CommonModule } from "@angular/common";
import { HeaderModule } from "./header/header.module";
import { HomeModule } from "./home/home.module";
import { ProductDetailModule } from "./product-detail/product-detail.module";
import { FooterModule } from "./footer/footer.module";
import { ProcessModule } from "./process/process.module";
import { ApplyModule } from "./apply/apply.module";
import { HttpClientModule } from '@angular/common/http';
import { LoanApplicationModule } from "./loan-application/loan-application.module";
import { Step1LoanTypeModule } from "./step1-loan-type/step1-loan-type.module";
import { Step2DetailsModule } from "./step2-details/step2-details.module";
import { ContactDetailsModule } from "./contact-details/contact-details.module";
import { ProductDetailsModule } from "./product-details/product-details.module";
import { EmicalculatorModule } from "./emicalculator/emicalculator.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderModule,
    ButtonModule,
    HomeModule,
    ProductDetailModule,
    FooterModule,
    ProcessModule,
    LoanApplicationModule,
    Step1LoanTypeModule,
    ApplyModule,
    Step2DetailsModule,
    HttpClientModule,
    ContactDetailsModule,
    ProductDetailsModule,
    EmicalculatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
