import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Evaluation } from '../../shared/Evaluation';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/evaluations`;
  
  constructor(private http: HttpClient) { }

  get(): Observable<Evaluation[]> {
      console.log('Heeee:' + httpOptions);
    return this.http.get<Evaluation[]>(this.apiUrl, httpOptions).pipe(
      tap(tipoServicos => console.log('get all evaluations' + Evaluation)),
      catchError(this.handleError('get-Evaluation', []))
    );
  }

  add(evaluation: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(this.apiUrl, evaluation, httpOptions).pipe(
      tap((evaluation: Evaluation) => console.log('adicionou o evaluation' + evaluation)),
      catchError(this.handleError<Evaluation>('add-Evaluation'))
    );
  }

  update(id: number, evaluation: Evaluation): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, evaluation, httpOptions).pipe(
      tap(evaluation => console.log(`updated evaluation id=${id}`)),
      catchError(this.handleError<any>('update-Evaluation'))
    );
  }

  getById(id: number): Observable<Evaluation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Evaluation>(url, httpOptions).pipe(
      tap(evaluation => console.log(`Evaluation by id=${id}`)),
      catchError(this.handleError<Evaluation>(`Evaluation by id=${id}`))
    );
  }

  remove(id: number): Observable<Evaluation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Evaluation>(url, httpOptions).pipe(
      tap(evaluation => console.log(`remove evaluation by id=${id}`)),
      catchError(this.handleError<Evaluation>('remove - Evaluation'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
