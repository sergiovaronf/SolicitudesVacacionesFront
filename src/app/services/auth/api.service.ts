import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  profileUser: any;

  private messageError = new Subject<string>();
  messageErrorHttp = this.messageError.asObservable();

  constructor() { }

  showError(text : string){    
    this.messageError.next(text);
  }
}
