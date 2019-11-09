import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Question } from '../../shared/Question';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/courses`;

  constructor(private http: HttpClient) { }

  get(): Observable<Question[]> {
    console.log('Heeee:' + httpOptions);
    return this.http.get<Question[]>(this.apiUrl, httpOptions).pipe(
      tap(question => console.log('get all question' + Question)),
      catchError(this.handleError('get-Question', []))
    );
  }

  add(question: Question): Observable<Question> {
    return this.http.post<Question>(this.apiUrl, question, httpOptions).pipe(
      tap((question: Question) => console.log('adicionou o question' + question)),
      catchError(this.handleError<Question>('add-question'))
    );
  }

  update(id: number, question: Question): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, question, httpOptions).pipe(
      tap(question => console.log(`updated question id=${id}`)),
      catchError(this.handleError<any>('update-question'))
    );
  }

  getById(id: number): Observable<Question> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Question>(url, httpOptions).pipe(
      tap(question => console.log(`question by id=${id}`)),
      catchError(this.handleError<Question>(`question by id=${id}`))
    );
  }

  remove(id: number): Observable<Question> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Question>(url, httpOptions).pipe(
      tap(question => console.log(`remove question by id=${id}`)),
      catchError(this.handleError<Question>('remove - question'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
