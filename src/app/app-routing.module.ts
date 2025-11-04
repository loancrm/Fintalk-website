import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ProcessComponent } from "./process/process.component";
import { ContactComponent } from "./contact/contact.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ApplyComponent } from "./apply/apply.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  // { path: "about", component: AboutComponent },
  // { path: "process", component: ProcessComponent },
  // { path: "apply", component: ApplyComponent },
  // { path: "product/:productName", component: ProductDetailComponent },
  { path: "", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      onSameUrlNavigation: "reload"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
