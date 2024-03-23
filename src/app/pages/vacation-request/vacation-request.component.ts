import { Component, ViewChild } from '@angular/core';
import { FormModalRequestComponent } from './components/form-modal-request/form-modal-request.component';
import { VacationRequestService } from 'src/app/services/vacation-request.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.scss']
})
export class VacationRequestComponent {

  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['fechaCreacion', 'fechaInicio', 'fechaFin', 'fechaRetorna', 'diasSolicita', 'estado'];


  listRequest: any[] = [];

  searchFilter;
  private searchFilterSubject = new Subject<string>();

  cantidad: number = 0;
  pageIndex = 0;
  pageSize = 10;

  listUser = [];

  user: any;

  isLoadingResults = false;

  constructor(
    private vacationRequestService: VacationRequestService,
    private userService: UserService,
    private _dialog: MatDialog,
  ) {
    this.loadData();
    this.loadUser();
  }

  loadUser() {
    return new Promise<any[]>((resolve) => {
      this.userService.getList().subscribe({
        next: (data: any) => {
          this.listUser = data.filter(u => u.empleado);
          resolve(data);
        },
        error: (err: any) => {
          this.listUser = [];
          resolve([]);
        }
      });
    });
  }

  loadTable() {
    if (this.user) {
      this.loadDataEmployee();
    } else {
      this.loadData();
    }
  }

  loadData() {
    this.vacationRequestService.getListPage(this.pageSize, this.pageIndex).subscribe({
      next: (data: any) => {
        if (data) {
          this.dataSource = new MatTableDataSource();
          this.cantidad = data.totalElements;
          this.listRequest = data.content;
          this.dataSource.data = this.listRequest;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource();
          this.cantidad = 0;
          this.listRequest = [];
          this.dataSource.data = [];
          this.dataSource.sort = this.sort;
        }
      }
    });
  }

  loadDataEmployee() {
    this.vacationRequestService.getListPageEmployee(this.user.empleado?.idEmpleado, this.pageSize, this.pageIndex).subscribe({
      next: (data: any) => {
        if (data) {
          this.dataSource = new MatTableDataSource();
          this.cantidad = data.totalElements;
          this.listRequest = data.content;
          this.dataSource.data = this.listRequest;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource();
          this.cantidad = 0;
          this.listRequest = [];
          this.dataSource.data = [];
          this.dataSource.sort = this.sort;
        }
      }
    });
  }

  changeEmployee(e) {
    this.pageIndex = 0;
    this.pageSize = 10;
    this.user = e;
    if (e) {
      this.loadDataEmployee();
    }else{
      this.loadData();
    }
  }

  changePage(e: any) {
    this.pageIndex = e.pageIndex;
    this.loadDataEmployee();
  }

  openAddEmployee() {
    const dialogRef = this._dialog.open(FormModalRequestComponent, {
      data: { request: undefined, user: this.user?.idUsuario, view: undefined },
      width: '80vh',
      disableClose: true,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadTable();
        }
      },
    });
  }

  openEditForm(data: any, view = false) {
    const dialogRef = this._dialog.open(FormModalRequestComponent, {
      data: { request: data, view: view },
      width: '80vh',
      disableClose: true,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadTable();
        }
      },
    });
  }

}
