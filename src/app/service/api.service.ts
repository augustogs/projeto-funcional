import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Branch } from '../interfaces/branch';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  url = 'https://api.github.com/repos';

  constructor(private httpClient: HttpClient ) {}

  getBranchesByIdERepositorio(user: string, repo: string, token: string): Observable<Branch[]>{
    let options = {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `token ${token}` })}
    return this.httpClient.get<Branch[]>(this.url + '/' + user + '/' + repo + '/branches', options)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
