import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Branch } from '../interfaces/branch';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  url = 'https://api.github.com/repos';

  constructor(private httpClient: HttpClient ) {}

  getBranchesByIdERepositorio(user: User): Observable<Branch[]>{
    let options = {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `token ${user.token}`})}
    return this.httpClient.get<Branch[]>(this.url + '/' + user.id + '/' + user.repository + '/branches', options)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
