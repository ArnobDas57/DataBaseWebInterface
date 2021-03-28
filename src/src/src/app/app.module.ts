import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ValidateService } from './validate.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { PopupComponent } from './popup/popup.component';
import { CreatePopupComponent } from './create-popup/create-popup.component';
import { CustomerComponent } from './customer/customer.component';
import { PhoneComponent } from './phone/phone.component';
import { PlanComponent } from './plan/plan.component';
import { UsageComponent } from './usage/usage.component';
import { AddonComponent } from './addon/addon.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PopupComponent,
    CreatePopupComponent,
    CustomerComponent,
    PhoneComponent,
    PlanComponent,
    UsageComponent,
    AddonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    NoopAnimationsModule,
    FormsModule
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
