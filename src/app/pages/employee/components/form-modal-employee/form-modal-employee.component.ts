import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../../../services/employee.service';
import { AlertOkComponent } from 'src/app/components/alert-ok/alert-ok.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-modal-employee',
  templateUrl: './form-modal-employee.component.html',
  styleUrls: ['./form-modal-employee.component.scss']
})
export class FormModalEmployeeComponent {

  empForm: FormGroup;
  userForm: FormGroup;

  dataSend: FormData = new FormData();

  view = false;

  userType = [
    'PrestacionServicio',
    'Indefinido',
  ]

  typeCompany = [
    'Juridica',
    'Natural'
  ]

  documentType = [
    'C.C',
    'NIT'
  ]

  stateType = [
    'ACTIVO',
    'INACTIVO'
  ]

  listRole = [];

  listPosition = [];

  userInput: string = '';

  constructor(
    private _fb: FormBuilder,
    public _dialogRef: MatDialogRef<FormModalEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: any, view: boolean },
    private employeeService: EmployeeService,
    private userService: UserService,
    private _dialog: MatDialog
  ) {
    if (this.data.view) {
      this.view = this.data.view;
    }
    this.loadForm();
  }

  async ngOnInit() {
    this.listRole = await this.loadRole();
    this.listPosition = await this.loadPosition();
    this.empForm.patchValue(this.data.employee);
    if (this.data.employee !== undefined) {
      this.empForm.get("idCargo").setValue(this.data.employee?.cargo?.idCargo);
    }
  }

  loadRole() {
    return new Promise<any[]>((resolve) => {
      this.userService.getListRole().subscribe({
        next: (data: any) => {
          resolve(data);
        },
        error: (err: any) => {
          resolve([]);
        }
      });
    });
  }

  loadPosition() {
    return new Promise<any[]>((resolve) => {
      this.userService.getListPosition().subscribe({
        next: (data: any[]) => {
          const list = data.filter(p => p.activo === "ACTIVO");
          resolve(list);
        },
        error: (err: any) => {
          resolve([]);
        }
      });
    });
  }

  loadForm() {
    this.empForm = this._fb.group({
      tipoDocumento: [{ value: '', disabled: this.view }, [Validators.required]],
      documento: [{ value: '', disabled: this.view }, [Validators.required]],
      nombre: [{ value: '', disabled: this.view }, [Validators.required]],
      apellido: [{ value: '', disabled: this.view }, [Validators.required]],
      telefono: [{ value: '', disabled: this.view }, [Validators.required]],
      direccion: [{ value: '', disabled: this.view }, [Validators.required]],
      fechaIngreso: [{ value: '', disabled: this.view }, [Validators.required]],
      tipoContrato: [{ value: '', disabled: this.view }, [Validators.required]],
      estadoEmpleado: [{ value: '', disabled: this.view }, [Validators.required]],
      idCargo: [{ value: '', disabled: this.view }, [Validators.required]]
    });

    this.userForm = this._fb.group({
      idEmpleado: [''],
      usuario: [''],
      activo: ['ACTIVO'],
      contraseña: ['Aa_1234567'],
      idRol: ['', [Validators.required]]
    });
  }

  async saveData() {
    if (this.empForm.valid) {
      if (this.data.employee !== undefined) {
        await this.editEmployee(this.empForm.value);

      } else if (this.userForm.valid) {
        const employee = await this.createEmployee(this.empForm.value);
        if (employee) {
          await this.createUser(employee);
        } else {
          this.empForm.reset();
        }
      } else {
        this.userForm.markAllAsTouched();
      }
    } else {
      this.empForm.markAllAsTouched();
    }
  }

  createEmployee(data) {
    data.documento = parseInt(data.documento);
    return new Promise<any>((resolve) => {
      this.employeeService.createEmployee(data).subscribe({
        next: (data: any) => {
          resolve(data);
        },
        error: (err: any) => {
          resolve(undefined);
          if(err.error.message){
            this.alertOk(err.error.message, "Error Empleado");
          }
        }
      });
    });
  }

  editEmployee(data) {
    return new Promise<boolean>((resolve) => {
      this.employeeService.updateEmployee(data, this.data.employee.idEmpleado).subscribe({
        next: (data: any) => {
          resolve(true);
          this._dialogRef.close(true);
          this.alertOk('El empleado fue actualizado exitosamente', 'Empleado')
        },
        error: (err: any) => {
          resolve(false);
          if(err.error.message){
            this.alertOk(err.error.message, "Error Empleado");
          }
        }
      });
    });
  }

  createUser(request) {
    this.userForm.get('idEmpleado').setValue(request.idEmpleado);
    this.userForm.get('usuario').setValue(request.document);
    return new Promise<string>((resolve) => {
      this.userService.createUser(this.userForm.value).subscribe({
        next: (data: any) => {
          resolve(data.id);
          this._dialogRef.close(true);
          this.alertOk('El empleado fue creado exitosamente', 'Empleado')
        },
        error: (err: any) => {
          resolve(undefined);
          this._dialogRef.close(true);
          this.alertOk(err.message, "Error");
        }
      });
    });
  }

  alertOk(message, title) {
    const dialogRef = this._dialog.open(AlertOkComponent, {
      data: { message, title }
    });
  }
}
