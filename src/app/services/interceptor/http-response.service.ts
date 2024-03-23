import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from '../auth/api.service';

@Injectable({
  providedIn: 'root'
})
export class HttpResponseService implements HttpInterceptor {


  constructor(private apiService: ApiService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(request)).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              this.apiService.showError('El usuario no esta autorizado.');
              return throwError(err);
            case 500:
              this.apiService.showError('Ha ocurrido un fallo en el servidor.');
              return throwError(err);
            case 404:
              this.apiService.showError('La informacion ingresada no existe.');
              return throwError(err);
            case 0:
              this.apiService.showError('La informacion ingresada no existe.');
              return throwError(err);
            default:
              return throwError(err);
          }
        } else {
          this.apiService.showError(err.message);
          return throwError(err);
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>) {
    let token = false;
    if (token) {
      return req.clone({
        setHeaders: ({
          'Authorization': `Bearer TOKEN`,
        })
      });
    } else {
      return req;
    }
  }

}
