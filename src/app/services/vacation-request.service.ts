import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';

const url = environment.host;

@Injectable({
  providedIn: 'root'
})
export class VacationRequestService {

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
    return this.http.get<any[]>(`${url}/request`, this.headers);
  }

  getListPage(cantidad : number, pagina : number) {
    return this.http.get<any[]>(`${url}/request?size=${cantidad}&page=${pagina}`);
  }

  getListPageEmployee(id : number, cantidad : number, pagina : number) {
    return this.http.get<any[]>(`${url}/request/employee/${id}?size=${cantidad}&page=${pagina}`);
  }

  createRequest(data: any) {
    return this.http.post(`${url}/request`, data);
  }

  updateRequest(data: any, id) {
    return this.http.patch(`${url}/request/${id}`, data);
  }

  deleteRequest(id) {
    return this.http.delete(`${url}/request/${id}`);
  }
}
