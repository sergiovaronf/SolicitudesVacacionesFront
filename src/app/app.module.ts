import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { LayoutComponent } from './layout/layout.component';
import { AlertConfirmComponent } from './components/alert-confirm/alert-confirm.component';
import { AlertOkComponent } from './components/alert-ok/alert-ok.component';
import { HttpResponseService } from './services/interceptor/http-response.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    AlertConfirmComponent,
    AlertOkComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
