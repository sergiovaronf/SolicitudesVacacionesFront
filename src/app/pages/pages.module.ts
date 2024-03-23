import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { EmployeeComponent } from './employee/employee.component';
import { VacationRequestComponent } from './vacation-request/vacation-request.component';
import { LayoutComponent } from '../layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormModalEmployeeComponent } from './employee/components/form-modal-employee/form-modal-employee.component';
import { FormModalRequestComponent } from './vacation-request/components/form-modal-request/form-modal-request.component';



@NgModule({
  declarations: [
    LayoutComponent,
    PagesComponent,
    EmployeeComponent,
    VacationRequestComponent,
    FormModalEmployeeComponent,
    FormModalRequestComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule
  ]
})
export class PagesModule { }
