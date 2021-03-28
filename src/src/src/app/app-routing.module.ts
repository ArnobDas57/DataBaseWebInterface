import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { PhoneComponent } from './phone/phone.component';
import { PlanComponent } from './plan/plan.component';
import { UsageComponent } from './usage/usage.component';
import { AddonComponent } from './addon/addon.component';
import { AuthGuard } from './auth.guard';

//Add canActivate:[AuthGuard] as extra parameter to restricted routes
const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'phone', component: PhoneComponent, canActivate:[AuthGuard]},
  {path:'plan', component: PlanComponent, canActivate:[AuthGuard]},
  {path:'usage', component: UsageComponent, canActivate:[AuthGuard]},
  {path:'addon', component: AddonComponent, canActivate:[AuthGuard]},
  {path:'customer', component: CustomerComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
