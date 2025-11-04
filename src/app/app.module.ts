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
    ApplyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
