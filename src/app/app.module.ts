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
import { FooterModule } from "./footer/footer.module";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoanApplicationModule } from "./loan-application/loan-application.module";
// Removed eager loading of non-critical modules to reduce initial bundle size
// These are now lazy loaded: ProductDetailsModule, EmicalculatorModule, etc.
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FormsModule } from '@angular/forms';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
@NgModule({ declarations: [AppComponent, ChatbotComponent],
    bootstrap: [AppComponent], imports: [CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HeaderModule,
        ButtonModule,
        HomeModule,
        FooterModule,
        LoanApplicationModule,
        FormsModule], providers: [
            provideHttpClient(withInterceptorsFromDi()),
            providePrimeNG({
                theme: {
                    preset: Aura
                }
            })
        ] })
export class AppModule { }
