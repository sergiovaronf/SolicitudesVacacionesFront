import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormModalEmployeeComponent } from './components/form-modal-employee/form-modal-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {

  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['document', 'name', 'phone', 'addres', 'date', 'type', 'state','detalles'];


  listEmployee: any[] = [];

  searchFilter;
  private searchFilterSubject = new Subject<string>();

  cantidad: number = 0;
  pageIndex = 0;
  pageSize = 10;


  isLoadingResults = false;

  constructor(
    private employeeService: EmployeeService,
    private _dialog: MatDialog,
  ) { 
    this.loadDataEmployee();
  }

  loadDataEmployee() {
    this.employeeService.getListPage(this.pageSize, this.pageSize * this.pageIndex).subscribe({
      next: (data: any) => {
        this.cantidad = data.totalElements;
        this.listEmployee = data.content;
        this.dataSource.data = this.listEmployee;
        this.dataSource.sort = this.sort;
      }
    });
  }

  changePage(e: any) { 
    this.pageIndex = e.pageIndex;
    this.loadDataEmployee();
  }

  openAddEmployee() {
    const dialogRef = this._dialog.open(FormModalEmployeeComponent, {
      data: { employee: undefined, view: undefined },
      width: '80vh',
      disableClose: true,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadDataEmployee();
        }
      },
    });
  }

  openEditForm(data: any, view = false) {
    const dialogRef = this._dialog.open(FormModalEmployeeComponent, {
      data: { employee: data, view: view },
      width: '80vh',
      disableClose: true,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadDataEmployee();
        }
      },
    });
  }

}
