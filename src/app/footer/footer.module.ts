import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { LucideAngularModule, Facebook, Instagram, Linkedin, Youtube } from 'lucide-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LucideAngularModule.pick({ Facebook, Instagram, Linkedin, Youtube })
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
