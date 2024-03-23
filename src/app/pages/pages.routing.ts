import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { EmployeeComponent } from "./employee/employee.component";
import { VacationRequestComponent } from "./vacation-request/vacation-request.component";

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
            { path: 'employee', component: EmployeeComponent, data: { title: 'Empleados' } },
            { path: 'vacation-request', component: VacationRequestComponent, data: { title: 'Solicitud de Vacaciones' } },
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }