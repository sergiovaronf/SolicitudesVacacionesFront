import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VacationRequestService } from '../../../../services/vacation-request.service';
import { AlertOkComponent } from 'src/app/components/alert-ok/alert-ok.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-modal-request',
  templateUrl: './form-modal-request.component.html',
  styleUrls: ['./form-modal-request.component.scss']
})
export class FormModalRequestComponent {

  empForm: FormGroup;
  userForm: FormGroup;

  dataSend: FormData = new FormData();

  view = false;

  listUser = [];

  constructor(
    private _fb: FormBuilder,
    public _dialogRef: MatDialogRef<FormModalRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { request: any, user : any, view: boolean },
    private _dialog: MatDialog,
    private vRequestService : VacationRequestService,
    private userService : UserService
  ) {
    if (this.data.view) {
      this.view = this.data.view;
    }
    this.loadForm();
  }

  async ngOnInit() {
    this.listUser = await this.loadUser();
    if(this.data.user){
      this.empForm.get("idUsuario").setValue(this.data.user);
    }
  }

  loadUser() {
    return new Promise<any[]>((resolve) => {
      this.userService.getList().subscribe({
        next: (data: any) => {
          resolve(data);
        },
        error: (err: any) => {
          resolve([]);
        }
      });
    });
  }

  loadForm() {
    this.empForm = this._fb.group({
      idUsuario: [{ value: '', disabled: this.view }, [Validators.required]],
      diasSolicita: [{ value: '', disabled: this.view }, [Validators.required]],
      fechaInicio: [{ value: '', disabled: this.view }, [Validators.required]],
      fechaFin: [{ value: '', disabled: this.view }, [Validators.required]],
      fechaRetorna: [{ value: '', disabled: this.view }, [Validators.required]],
      estado: ['ENPROCESO'],
      observaciones: [{ value: '', disabled: this.view }]
    });
  }

  async saveData() {
    if (this.empForm.valid) {
      if (this.data.request !== undefined) {
        await this.editRequest(this.empForm.value);
      } else {
        const request = await this.createRequest(this.empForm.value);
      }
    } else {
      this.empForm.markAllAsTouched();
    }
  }

  createRequest(data) {
    return new Promise<any>((resolve) => {
      this.vRequestService.createRequest(data).subscribe({
        next: (data: any) => {
          resolve(data);
          this._dialogRef.close(true);
          this.alertOk('La solicitud fue creada exitosamente', 'Solicitud')
        },
        error: (err: any) => {
          resolve(undefined);
          if(err.error.message){
            this.alertOk(err.error.message, "Error Solicitud");
          }else if(err.error.code == 400){
            this.alertOk(err.error?.errors || "Error en la solictud vuelva a intentarlo nuevamente", "Error Solicitud");
          }
        }
      });
    });
  }

  editRequest(data) {
    return new Promise<boolean>((resolve) => {
      this.vRequestService.updateRequest(data, this.data.request.idSolicitud).subscribe({
        next: (data: any) => {
          resolve(true);
          this._dialogRef.close(true);
          this.alertOk('La solicitud fue actualizada exitosamente', 'Solicitud')
        },
        error: (err: any) => {
          resolve(false);
          if(err.error.message){
            this.alertOk(err.error.message, "Error Solicitud");
          }else if(err.error.code == 400){
            this.alertOk(err.error?.errors || "Error en la solictud vuelva a intentarlo nuevamente", "Error Solicitud");
          }
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
