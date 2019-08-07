import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { PersonType } from 'src/app/shared/PersonType';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class PersonTypeService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/person-types`;
  
  constructor(private http: HttpClient) {}

  get(): Observable<PersonType[]> {
    return this.http.get<PersonType[]>(this.apiUrl, httpOptions).pipe(
      tap(tipoServicos => console.log('get all personType' + PersonType)),
      catchError(this.handleError('get-PersonType', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
