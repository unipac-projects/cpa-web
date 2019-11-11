import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Choice } from '../../shared/Choice';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ChoiceService {

  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/choices`;

  constructor(private http: HttpClient) { }

  get(): Observable<Choice[]> {
    return this.http.get<Choice[]>(this.apiUrl, httpOptions).pipe(
      tap(choice => console.log('get all choice' + choice)),
      catchError(this.handleError('get-choice', []))
    );
  }

  add(choice: Choice): Observable<Choice> {
    return this.http.post<Choice>(this.apiUrl, choice, httpOptions).pipe(
      tap((choice: Choice) => console.log('adicionou o choice' + choice)),
      catchError(this.handleError<Choice>('add-choice'))
    );
  }

  update(id: number, choice: Choice): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, choice, httpOptions).pipe(
      tap(choice => console.log(`updated choice id=${id}`)),
      catchError(this.handleError<any>('update-choice'))
    );
  }

  getById(id: number): Observable<Choice> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Choice>(url, httpOptions).pipe(
      tap(choice => console.log(`choice by id=${id}`)),
      catchError(this.handleError<Choice>(`choice by id=${id}`))
    );
  }

  remove(id: number): Observable<Choice> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Choice>(url, httpOptions).pipe(
      tap(choice => console.log(`remove choice by id=${id}`)),
      catchError(this.handleError<Choice>('remove - choice'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }

}
