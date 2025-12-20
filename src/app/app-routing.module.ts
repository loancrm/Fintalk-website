import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoanApplicationComponent } from "./loan-application/loan-application.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: 'apply', component: LoanApplicationComponent },
  // Lazy load non-critical routes to reduce initial bundle size and improve FCP/LCP
  { 
    path: 'products/:slug', 
    loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule)
  },
  { 
    path: 'cookies-policy', 
    loadChildren: () => import('./cookies-policy/cookies-policy.module').then(m => m.CookiesPolicyModule)
  },
  { 
    path: 'privacy-policy', 
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
  },
  { 
    path: 'emi-calculator', 
    loadChildren: () => import('./emicalculator/emicalculator.module').then(m => m.EmicalculatorModule)
  },

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
      onSameUrlNavigation: "reload",
      // Removed PreloadAllModules - lazy loaded routes will load on demand
      // This reduces initial bundle size and improves FCP/LCP
      preloadingStrategy: undefined
  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
