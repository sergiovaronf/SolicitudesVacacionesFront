import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';

const url = environment.host;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH'
    })
  }

  headersFile = new HttpHeaders({
    'Content-Type': 'multipart/form-data',
  })

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get<any[]>(`${url}/user`, this.headers);
  }

  getOne(id) {
    return this.http.get<any[]>(`${url}/user/${id}`, this.headers);
  }

  createUser(data: any) {
    return this.http.post(`${url}/user`, data);
  }

  updateUser(data: any, id) {
    return this.http.patch(`${url}/user/${id}`, data);
  }

  deleteUser(id) {
    return this.http.delete(`${url}/user/${id}`);
  }

  getListRole() {
    return this.http.get<any[]>(`${url}/user-role`, this.headers);
  }

  getListPosition() {
    return this.http.get<any[]>(`${url}/position`, this.headers);
  }

  createRole() {
    return this.http.post(`${url}/user-role`, { rol: "Empleado" }, this.headers);
  }

  createPosition() {
    return this.http.post(`${url}/position`, { cargo: "Empleado", descripcion: "Empleado", activo: "ACTIVO"}, this.headers);
  }
}

