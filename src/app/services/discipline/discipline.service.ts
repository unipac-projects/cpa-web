import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Discipline } from '../../shared/Discipline';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/disciplines`;
  
  constructor(private http: HttpClient) { }

  get(): Observable<Discipline[]> {
      console.log('Heeee:' + httpOptions);
    return this.http.get<Discipline[]>(this.apiUrl, httpOptions).pipe(
      tap(tipoServicos => console.log('get all disciplines' + Discipline)),
      catchError(this.handleError('get-Discipline', []))
    );
  }

  add(discipline: Discipline): Observable<Discipline> {
    return this.http.post<Discipline>(this.apiUrl, discipline, httpOptions).pipe(
      tap((discipline: Discipline) => console.log('adicionou o discipline' + discipline)),
      catchError(this.handleError<Discipline>('add-Discipline'))
    );
  }

  update(id: number, discipline: Discipline): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, discipline, httpOptions).pipe(
      tap(discipline => console.log(`updated discipline id=${id}`)),
      catchError(this.handleError<any>('update-Discipline'))
    );
  }

  getById(id: number): Observable<Discipline> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Discipline>(url, httpOptions).pipe(
      tap(discipline => console.log(`Discipline by id=${id}`)),
      catchError(this.handleError<Discipline>(`Discipline by id=${id}`))
    );
  }

  remove(id: number): Observable<Discipline> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Discipline>(url, httpOptions).pipe(
      tap(discipline => console.log(`remove discipline by id=${id}`)),
      catchError(this.handleError<Discipline>('remove - Discipline'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
