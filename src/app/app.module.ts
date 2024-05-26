import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { customInterceptor } from './services/custom.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,BrowserModule,ReactiveFormsModule, FormsModule, HttpClientModule],
  providers: [provideHttpClient(withInterceptors([customInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
