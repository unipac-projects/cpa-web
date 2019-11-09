import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { LikertSkala } from '../../shared/LikertSkala';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class LikertSkalaService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/likert-skalas`;

  constructor(private http: HttpClient) { }

  get(): Observable<LikertSkala[]> {
    console.log('Heeee:' + httpOptions);
    return this.http.get<LikertSkala[]>(this.apiUrl, httpOptions).pipe(
      tap(likertSkala => console.log('get all likertSkala' + LikertSkala)),
      catchError(this.handleError('get-LikertSkala', []))
    );
  }

  add(likertSkala: LikertSkala): Observable<LikertSkala> {
    return this.http.post<LikertSkala>(this.apiUrl, likertSkala, httpOptions).pipe(
      tap((likertSkala: LikertSkala) => console.log('adicionou o likertSkala' + LikertSkala)),
      catchError(this.handleError<LikertSkala>('add-likertSkala'))
    );
  }

  update(id: number, likertSkala: LikertSkala): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, likertSkala, httpOptions).pipe(
      tap(likertSkala => console.log(`updated likertSkala id=${id}`)),
      catchError(this.handleError<any>('update-likertSkala'))
    );
  }

  getById(id: number): Observable<LikertSkala> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<LikertSkala>(url, httpOptions).pipe(
      tap(likertSkala => console.log(`likertSkala by id=${id}`)),
      catchError(this.handleError<LikertSkala>(`likertSkala by id=${id}`))
    );
  }

  remove(id: number): Observable<LikertSkala> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<LikertSkala>(url, httpOptions).pipe(
      tap(likertSkala => console.log(`remove likertSkala by id=${id}`)),
      catchError(this.handleError<LikertSkala>('remove - likertSkala'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
