import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Period } from '../../shared/Period';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/periods`;
  
  constructor(private http: HttpClient) { }

  get(): Observable<Period[]> {
      console.log('Heeee:' + httpOptions);
    return this.http.get<Period[]>(this.apiUrl, httpOptions).pipe(
      tap(period => console.log('get all periods' + period)),
      catchError(this.handleError('get-Period', []))
    );
  }

  add(period: Period): Observable<Period> {
    return this.http.post<Period>(this.apiUrl, period, httpOptions).pipe(
      tap((period: Period) => console.log('adicionou o period' + period)),
      catchError(this.handleError<Period>('add-Period'))
    );
  }

  update(id: number, period: Period): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, period, httpOptions).pipe(
      tap(period => console.log(`updated period id=${id}`)),
      catchError(this.handleError<any>('update-Period'))
    );
  }

  getById(id: number): Observable<Period> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Period>(url, httpOptions).pipe(
      tap(period => console.log(`Period by id=${id}`)),
      catchError(this.handleError<Period>(`Period by id=${id}`))
    );
  }

  remove(id: number): Observable<Period> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Period>(url, httpOptions).pipe(
      tap(period => console.log(`remove period by id=${id}`)),
      catchError(this.handleError<Period>('remove - Period'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
