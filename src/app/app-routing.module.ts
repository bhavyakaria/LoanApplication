import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmiCalculatorComponent } from './emi-calculator/emi-calculator.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EmiCalculatorComponent
  },
  {
    path: 'customer-details',
    component: CustomerDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
